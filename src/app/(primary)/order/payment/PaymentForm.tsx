"use client";

import { modalState, orderState, searchResultState } from "@/atoms/atoms";
import Badge from "@/components/Badge/Badge";
import Submit from "@/components/Submit/Submit";
import orderAction from "@/data/actions/orderAction";
import useAddVisitedPage from "@/hook/useAddVisitedPage";
import useCreateTestUser from "@/hook/useCreateTestUser";
import usePersonalPrice from "@/hook/usePersonalPrice";
import { countries } from "@/lib/countries";
import { AirportData, CodeState, IMPData, Purchaser } from "@/types";
import { User } from "next-auth";
import { useRouter } from "next/navigation";
import { BaseSyntheticEvent, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";

export interface PaymentPassenger {
  type: "adult" | "child" | "infant";
  nameKor: string;
  gender: "F" | "M";
  nameEngLast: string;
  nameEngFirst: string;
  birth: string;
  phone1: string;
  phone2: string;
  phone3: string;
  passport: { number: string; expDate: string };
  nationality: string;
  issueCountry: string;
  email: string;
}

interface PaymentPurchaser extends Purchaser {
  phone1: string;
  phone2: string;
  phone3: string;
  emergencyPhone1: string;
  emergencyPhone2: string;
  emergencyPhone3: string;
}

export type PaymentData = {
  purchaser: PaymentPurchaser;
  passengers: {
    [key: string]: PaymentPassenger;
  };
};

const PaymentForm = ({
  user,
  code,
}: {
  user: User | undefined;
  code: CodeState<AirportData>;
}) => {
  const router = useRouter();
  const setModal = useSetRecoilState(modalState);
  const { totalPrice, itineraries, price } = useRecoilValue(orderState);
  const passengers = usePersonalPrice();
  const [clickedTitle, setClickedTitle] = useState(["0-0"]);
  const resetSearchResultData = useResetRecoilState(searchResultState);
  const totalNum = passengers.reduce((acc, item) => acc + item.length, 0);
  const testUsers = useMemo(() => useCreateTestUser(totalNum), [totalNum]);
  const [isFillBlank, setFillBlank] = useState(true);

  // 사용자 테스트
  const { setVisitedPage } = useAddVisitedPage();

  const changeIsFillBlank = () => {
    const currentValues = getValues();
    const savedPurchaser = currentValues.purchaser; // purchaser 값만 저장
    reset(); // 폼 초기화

    // isFillBlank 값에 따라 값을 설정하고 복원
    if (savedPurchaser) setValue("purchaser", savedPurchaser);
    setFillBlank(!isFillBlank);
  };

  // 랜덤 예약 번호 생성
  const generateRandomStr = () => {
    let letters = "";
    let numbers = "";
    const lettersCondition = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbersCondition = "0123456789";

    for (let i = 0; i < 3; i++) {
      letters += lettersCondition.charAt(
        Math.floor(Math.random() * lettersCondition.length),
      );
      numbers += numbersCondition.charAt(
        Math.floor(Math.random() * numbersCondition.length),
      );
    }
    const combined = (letters + numbers).split("");
    for (let i = combined.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [combined[i], combined[j]] = [combined[j], combined[i]];
    }

    return combined.join("");
  };
  const reservationId = generateRandomStr();

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<PaymentData>();

  const handleInfoClick = (uniqueIdx: string) => {
    setClickedTitle(
      clickedTitle.includes(uniqueIdx)
        ? clickedTitle.filter((item) => item !== uniqueIdx)
        : [...clickedTitle, uniqueIdx],
    );
  };

  const handleCreateOrder = async (
    formData: PaymentData,
    finalPrice: number,
    image: string,
  ) => {
    resetSearchResultData();
    await orderAction(
      formData,
      itineraries,
      price,
      finalPrice,
      image,
      reservationId,
    );
  };

  const handleForm = (
    formData: PaymentData,
    e: BaseSyntheticEvent<object> | undefined,
  ) => {
    const submitButtonText = (e!.nativeEvent as HTMLFormElement).submitter
      .innerText;
    const charge = totalNum * +process.env.NEXT_PUBLIC_CHARGE!;
    const finalPrice = +totalPrice + charge;
    const arrival =
      itineraries[0].segments[itineraries[0].segments.length - 1].arrival
        .iataCode;
    const image = code[arrival].img;

    // 사용자 테스트
    setVisitedPage("항공권 예약");

    if (submitButtonText === "결제하기") {
      const { IMP } = window;
      IMP.init(process.env.NEXT_PUBLIC_MERCHANT_CODE as string);
      IMP.request_pay(
        {
          pg: "kcp",
          pay_method: "card",
          merchant_uid:
            new Date().getTime() + Math.floor(Math.random() * 1000000),
          name: "항공권 구매",
          amount: finalPrice,
          buyer_name: formData.purchaser.name,
          buyer_tel: `${formData.purchaser.phone1}-${formData.purchaser.phone2}-${formData.purchaser.phone3}`,
          buyer_email: formData.purchaser.email,
        },

        async (res: IMPData) => {
          try {
            if (res.success) {
              // 결제 성공 후 주문 api 통신
              handleCreateOrder(formData, finalPrice, image);
              setModal({
                isOpen: true,
                title: "안내",
                content:
                  "항공권 구매가 완료되었습니다. \n좌석 선택 화면으로 이동합니다.",
                buttonNum: 1,
                handleConfirm: () =>
                  router.replace(`/order/seat-map/${reservationId}`),
                handleCancel: () => {},
              });
            } else {
              setModal({
                isOpen: true,
                title: "안내",
                content: "결제를 취소하셨습니다.",
                buttonNum: 1,
                handleConfirm: () => {},
                handleCancel: () => {},
              });
            }
          } catch {
            setModal({
              isOpen: true,
              title: "안내",
              content:
                "일시적인 오류가 발생했습니다. \n잠시 후 다시 시도해주세요.",
              buttonNum: 1,
              handleConfirm: () => {},
              handleCancel: () => {},
            });
          }
        },
      );
    } else {
      // 테스트 결제 스킵
      handleCreateOrder(formData, finalPrice, image);
      setModal({
        isOpen: true,
        closeButton: false,
        title: "안내",
        content: "결제를 스킵하였습니다. \n좌석 선택 화면으로 이동합니다.",
        buttonNum: 1,
        handleConfirm: () => router.replace(`/order/seat-map/${reservationId}`),
        handleCancel: () => {},
      });
    }
  };

  return (
    <form className="input-form" onSubmit={handleSubmit(handleForm)}>
      <div className="input-inner reservation">
        <h3 className="title">예약자 정보</h3>
        <div className="input-flex">
          <div className="input-box">
            <label htmlFor="name">
              이름
              <span className="errorMsg">
                {errors && errors.purchaser?.name?.message}
              </span>
            </label>
            <input
              type="text"
              id="name"
              placeholder="이름을 입력하세요"
              defaultValue={user?.name || ""}
              {...register("purchaser.name", {
                required: "이름을 입력하세요.",
                minLength: {
                  value: 2,
                  message: "이름을 2글자 이상 입력하세요.",
                },
              })}
            />
          </div>
          <div className="input-box">
            <label htmlFor="birth">
              생년월일
              <span className="errorMsg">
                {errors && errors.purchaser?.birth?.message}
              </span>
            </label>
            <input
              type="tel"
              id="birth"
              maxLength={8}
              defaultValue={user?.birth || ""}
              {...register("purchaser.birth", {
                minLength: {
                  value: 8,
                  message: "생년월일 8자리를 입력해주세요.",
                },
              })}
              placeholder="20020101"
            />
          </div>
          <div className="input-box">
            <label htmlFor="email">
              이메일
              <span className="errorMsg">
                {errors && errors.purchaser?.email?.message}
              </span>
            </label>
            <input
              id="email"
              placeholder="이메일을 입력하세요"
              type="text"
              defaultValue={user?.email || ""}
              {...register("purchaser.email")}
            />
          </div>
          <div className="input-box">
            <label htmlFor="phone1">
              휴대폰 번호
              <span className="errorMsg">
                {/* {errors?.purchaser?.phone1
                  ? errors.purchaser?.phone1?.message
                  : errors?.purchaser?.phone2
                    ? errors.purchaser?.phone2?.message
                    : errors?.purchaser?.phone3 &&
                      errors.purchaser?.phone3?.message} */}
              </span>
            </label>
            <div className="input-phone">
              <input
                type="tel"
                id="phone1"
                maxLength={3}
                placeholder="010"
                defaultValue={user?.phone?.split("-")[0]}
                {...register("purchaser.phone1", {
                  required: "핸드폰 번호를 입력하세요.",
                  minLength: {
                    value: 2,
                    message: "핸드폰 번호를 입력하세요.",
                  },
                  pattern: {
                    value: /^[0-9]*$/,
                    message: "숫자만 입력해주세요.",
                  },
                })}
              />
              -
              <input
                type="tel"
                id="phone2"
                maxLength={4}
                placeholder="1234"
                defaultValue={user?.phone?.split("-")[1]}
                {...register("purchaser.phone2", {
                  required: "핸드폰 번호를 입력하세요.",
                  minLength: {
                    value: 3,
                    message: "핸드폰 번호를 입력하세요.",
                  },
                  pattern: {
                    value: /^[0-9]*$/,
                    message: "숫자만 입력해주세요.",
                  },
                })}
              />
              -
              <input
                type="tel"
                id="phone3"
                maxLength={4}
                placeholder="5678"
                defaultValue={user?.phone?.split("-")[2]}
                {...register("purchaser.phone3", {
                  required: "핸드폰 번호를 입력하세요.",
                  minLength: {
                    value: 4,
                    message: "핸드폰 번호를 입력하세요.",
                  },
                  pattern: {
                    value: /^[0-9]*$/,
                    message: "숫자만 입력해주세요.",
                  },
                })}
              />
            </div>
          </div>
          <div className="input-box">
            <label htmlFor="emergencyPhone1">
              비상 연락처
              <span className="errorMsg">
                {/* {errors?.emergencyPhone1
              ? errors.emergencyPhone1?.message
              : errors?.emergencyPhone2
                ? errors.emergencyPhone2?.message
                : errors?.emergencyPhone3 && errors.emergencyPhone3?.message} */}
              </span>
            </label>
            <div className="input-phone">
              <input
                type="tel"
                id="emergencyPhone1"
                maxLength={3}
                placeholder="010"
                {...register("purchaser.emergencyPhone1", {
                  required: "비상 연락처를 입력하세요.",
                  minLength: {
                    value: 2,
                    message: "비상 연락처를 입력하세요.",
                  },
                  pattern: {
                    value: /^[0-9]*$/,
                    message: "숫자만 입력해주세요.",
                  },
                })}
              />
              -
              <input
                type="tel"
                id="emergencyPhone2"
                maxLength={4}
                placeholder="1234"
                {...register("purchaser.emergencyPhone2", {
                  required: "비상 연락처를 입력하세요.",
                  minLength: {
                    value: 3,
                    message: "비상 연락처를 입력하세요.",
                  },
                  pattern: {
                    value: /^[0-9]*$/,
                    message: "숫자만 입력해주세요.",
                  },
                })}
              />
              -
              <input
                type="tel"
                id="emergencyPhone3"
                maxLength={4}
                placeholder="5678"
                {...register("purchaser.emergencyPhone3", {
                  required: "비상 연락처를 입력하세요.",
                  minLength: {
                    value: 4,
                    message: "비상 연락처를 입력하세요.",
                  },
                  pattern: {
                    value: /^[0-9]*$/,
                    message: "숫자만 입력해주세요.",
                  },
                })}
              />
            </div>
          </div>
        </div>
        <ul className="info-box">
          <li>
            탑승객의 승객정보 의무 수집 강화로 인해 비상연락처를 필수로 입력해야
            합니다.
          </li>
        </ul>
      </div>

      <div className="input-inner passenger">
        <h3 className="title with-check">
          탑승자 정보
          <div className="title-check-box">
            <input
              type="checkbox"
              name="테스트 유저"
              id="fillBlank"
              checked={isFillBlank}
              onChange={changeIsFillBlank}
            />
            <label htmlFor="fillBlank">랜덤 데이터로 빈칸 채우기</label>
          </div>
        </h3>

        <div className="input-toggle">
          {passengers.map((item, idx) => {
            if (!item.length) return false;
            const type = idx === 0 ? "성인" : idx === 1 ? "소아" : "유아";
            const typeEn = idx === 0 ? "adult" : idx === 1 ? "child" : "infant";

            return item.map((_, count) => {
              const key = `[${typeEn}_${count}]`;
              const uniqueIdx = `${idx}-${count}`;

              return (
                <div
                  key={`${typeEn}${count}`}
                  className={`information ${!clickedTitle.includes(uniqueIdx) ? "hide" : ""}`}
                >
                  <h4>
                    <button
                      type="button"
                      className={`${typeEn}`}
                      onClick={() => handleInfoClick(uniqueIdx)}
                      onKeyDown={() => handleInfoClick(uniqueIdx)}
                    >
                      <Badge type={type === "성인" ? "primary" : "gray"}>
                        {type}
                      </Badge>
                      탑승자 정보 <span className="count">{count + 1}</span>
                    </button>
                  </h4>

                  <div className="input-flex">
                    <input
                      type="hidden"
                      value={typeEn}
                      {...register(`passengers.${key}.type`)}
                    />
                    <div className="input-box">
                      <label htmlFor="nameKor">
                        이름
                        <span className="errorMsg">
                          {/* {errors && errors.passengers?.[key]?.nameKor?.message} */}
                        </span>
                      </label>
                      <input
                        id="nameKor"
                        placeholder="이름을 입력하세요"
                        type="text"
                        defaultValue={
                          isFillBlank ? testUsers[count].nameKor : ""
                        }
                        {...register(`passengers.${key}.nameKor`, {
                          required: "이름을 입력하세요.",
                          minLength: {
                            value: 2,
                            message: "이름을 2글자 이상 입력하세요.",
                          },
                        })}
                      />
                    </div>
                    <div className="input-box">
                      <label htmlFor="gender">
                        성별
                        <span className="errorMsg">
                          {/* {errors && errors.passengers?.[key]?.gender?.message} */}
                        </span>
                      </label>
                      <div className="radio-box">
                        <input
                          id={`passengers.${key}.genderM`}
                          type="radio"
                          className="hidden"
                          defaultChecked={
                            isFillBlank
                              ? testUsers[count].gender === "M"
                              : false
                          }
                          {...register(`passengers.${key}.gender`, {
                            required: "성별을 선택하세요.",
                          })}
                        />
                        <label htmlFor={`passengers.${key}.genderM`}>
                          남자
                        </label>
                        <input
                          id={`passengers.${key}.genderF`}
                          type="radio"
                          value="F"
                          className="hidden"
                          defaultChecked={
                            isFillBlank
                              ? testUsers[count].gender === "F"
                              : false
                          }
                          {...register(`passengers.${key}.gender`, {
                            required: "성별을 선택하세요.",
                          })}
                        />
                        <label htmlFor={`passengers.${key}.genderF`}>
                          여자
                        </label>
                      </div>
                    </div>

                    <div className="input-box">
                      <label htmlFor={`passengers.${key}.nameEngLast`}>
                        영문 성
                        <span className="errorMsg">
                          {/* {errors &&
                            errors.passengers?.[key]?.nameEngLast?.message} */}
                        </span>
                      </label>
                      <input
                        id={`passengers.${key}.nameEngLast`}
                        className="text-upper"
                        placeholder="영문 성을 입력하세요"
                        defaultValue={
                          isFillBlank ? testUsers[count].nameEngLast : ""
                        }
                        type="text"
                        {...register(`passengers.${key}.nameEngLast`, {
                          required: "영문 성을 입력하세요.",
                        })}
                      />
                    </div>
                    <div className="input-box">
                      <label htmlFor="nameEngFirst">
                        영문 이름
                        <span className="errorMsg">
                          {/* {errors &&
                            errors.passengers?.[key]?.nameEngFirst?.message} */}
                        </span>
                      </label>
                      <input
                        id="nameEngFirst"
                        className="text-upper"
                        placeholder="영문 이름을 입력하세요"
                        type="text"
                        defaultValue={
                          isFillBlank ? testUsers[count].nameEngFirst : ""
                        }
                        {...register(`passengers.${key}.nameEngFirst`, {
                          required: "영문 이름을 입력하세요.",
                        })}
                      />
                    </div>
                    <div className="input-box">
                      <label htmlFor="birth">
                        생년월일
                        <span className="errorMsg">
                          {/* {errors && errors.passengers?.[key]?.birth?.message} */}
                        </span>
                      </label>
                      <input
                        type="tel"
                        maxLength={8}
                        placeholder="20020101"
                        defaultValue={isFillBlank ? testUsers[count].birth : ""}
                        {...register(`passengers.${key}.birth`, {
                          required: "생년월일을 입력하세요.",
                          minLength: {
                            value: 8,
                            message: "생년월일 8자리를 입력해주세요.",
                          },
                          pattern: {
                            value: /^[0-9]*$/,
                            message: "숫자만 입력해주세요.",
                          },
                        })}
                      />
                    </div>
                    <div className="input-box">
                      <label htmlFor="phone1">
                        휴대폰 번호
                        {/* <span className="errorMsg"></span> */}
                      </label>
                      <div className="input-phone">
                        <input
                          type="tel"
                          id="phone1"
                          maxLength={3}
                          placeholder="010"
                          defaultValue={
                            isFillBlank ? testUsers[count].phone1 : ""
                          }
                          {...register(`passengers.${key}.phone1`, {
                            required: "핸드폰 번호를 입력하세요.",
                            minLength: {
                              value: 2,
                              message: "핸드폰 번호를 입력하세요.",
                            },
                            pattern: {
                              value: /^[0-9]*$/,
                              message: "숫자만 입력해주세요.",
                            },
                          })}
                        />
                        -
                        <input
                          type="tel"
                          id="phone2"
                          maxLength={4}
                          placeholder="1234"
                          defaultValue={
                            isFillBlank ? testUsers[count].phone2 : ""
                          }
                          {...register(`passengers.${key}.phone2`, {
                            required: "핸드폰 번호를 입력하세요.",
                            minLength: {
                              value: 3,
                              message: "핸드폰 번호를 입력하세요.",
                            },
                            pattern: {
                              value: /^[0-9]*$/,
                              message: "숫자만 입력해주세요.",
                            },
                          })}
                        />
                        -
                        <input
                          type="tel"
                          id="phone3"
                          maxLength={4}
                          placeholder="5678"
                          defaultValue={
                            isFillBlank ? testUsers[count].phone3 : ""
                          }
                          {...register(`passengers.${key}.phone3`, {
                            required: "핸드폰 번호를 입력하세요.",
                            minLength: {
                              value: 4,
                              message: "핸드폰 번호를 입력하세요.",
                            },
                            pattern: {
                              value: /^[0-9]*$/,
                              message: "숫자만 입력해주세요.",
                            },
                          })}
                        />
                      </div>
                    </div>
                    <div className="input-box">
                      <label htmlFor="passport.number">
                        여권 번호
                        <span className="errorMsg">
                          {/* {errors &&
                            errors.passengers?.[key]?.passport.number?.message} */}
                        </span>
                      </label>
                      <input
                        className="text-upper"
                        type="text"
                        placeholder="M12345678"
                        maxLength={9}
                        defaultValue={
                          isFillBlank ? testUsers[count].passport.number : ""
                        }
                        {...register(`passengers.${key}.passport.number`, {
                          minLength: {
                            value: 9,
                            message: "여권 번호를 확인해주세요.",
                          },
                        })}
                      />
                    </div>
                    <div className="input-box">
                      <label htmlFor="passport.expDate">
                        여권 만료일
                        <span className="errorMsg">
                          {/* {errors &&
                            errors.passengers?.[key]?.passport.expDate?.message} */}
                        </span>
                      </label>
                      <input
                        type="tel"
                        maxLength={8}
                        placeholder="20020101"
                        defaultValue={
                          isFillBlank ? testUsers[count].passport.expDate : ""
                        }
                        {...register(`passengers.${key}.passport.expDate`, {
                          minLength: {
                            value: 8,
                            message: "여권 만료일 8자리를 입력해주세요.",
                          },
                          pattern: {
                            value: /^[0-9]*$/,
                            message: "숫자만 입력해주세요.",
                          },
                        })}
                      />
                    </div>
                    <div className="input-box">
                      <label htmlFor={`passengers.${key}.nationality`}>
                        국적
                        <span className="errorMsg">
                          {/* {errors &&
                            errors.passengers?.[key]?.passport.nationality
                              ?.message} */}
                        </span>
                      </label>
                      <select {...register(`passengers.${key}.nationality`)}>
                        {countries.map((country) => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="input-box">
                      <label htmlFor={`passengers.${key}.issueCountry`}>
                        발행 국가
                        <span className="errorMsg">
                          {/* {errors &&
                            errors.passengers?.[key]?.passport.nationality
                              ?.message} */}
                        </span>
                      </label>
                      <select {...register(`passengers.${key}.issueCountry`)}>
                        {countries.map((country) => (
                          <option key={country} value={country}>
                            {country}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="input-box">
                      <label htmlFor={`passengers.${key}.email`}>이메일</label>
                      <input
                        id="email"
                        placeholder="이메일을 입력하세요"
                        type="text"
                        defaultValue={isFillBlank ? testUsers[count].email : ""}
                        {...register(`passengers.${key}.email`)}
                      />
                    </div>
                  </div>
                </div>
              );
            });
          })}
        </div>

        <ul className="info-box">
          <li>
            <strong>
              여권상의 정보와 꼭 동일하게 입력해주세요. 잘못된 정보 등록 시
              탑승할 수 없습니다.
            </strong>
            <br />
            (영문 성/이름 입력시 띄어쓰기나 &quot;-&quot;표시 없이 영문스펠링만
            정확히 입력해 주십시오)
          </li>
          <li>
            출발 24시간 전까지 꼭 정확한 여권 정보를 등록해주세요. <br />
            (미주 지역으로 여행하거나 경유시에는 출발 72시간 전까지 정확하게
            등록해주세요.)
          </li>
          <li>
            정확한 승객 정보 확인을 위해 탑승자별로 휴대폰 번호와 이메일을
            입력해주세요.
          </li>
        </ul>
      </div>

      <div className="btn-box">
        <Submit size="full">결제하기</Submit>
        <Submit size="full" bgColor="primary30">
          결제 건너뛰기
        </Submit>
      </div>
      <div className="info-box">
        <ul>
          <li>
            <strong>테스트 결제</strong>이므로 실제로 결제되지 않습니다.
          </li>
        </ul>
      </div>
    </form>
  );
};

export default PaymentForm;
