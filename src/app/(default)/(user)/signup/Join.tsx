"use client";

import { modalState } from "@/atoms/atoms";
import Button from "@/components/Button/Button";
import Submit from "@/components/Submit/Submit";
import signupAction from "@/data/actions/signupAction";
import { UserForm } from "@/types";
import { Dispatch } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";

export interface UserData extends UserForm {
  passwordChk: string;
  phone1: string;
  phone2: string;
  phone3: string;
}
interface SignupStepProp {
  setStep: Dispatch<React.SetStateAction<number>>;
  setName: Dispatch<React.SetStateAction<string>>;
}

const Join = ({ setStep, setName }: SignupStepProp) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<UserData>();

  const setModal = useSetRecoilState(modalState);

  const handleJoin = async (formData: UserData) => {
    const res = await signupAction(formData);
    if (res === 1) {
      setStep(3);
      setName(formData.name);
    } else {
      setModal({
        isOpen: true,
        title: "알림",
        content: res,
        buttonNum: 1,
        handleConfirm: () => {},
        handleCancel: () => {},
      });
    }
    return null;
  };

  return (
    <section className="join">
      <h3 className="hidden">정보 입력</h3>

      <form className="input-form" onSubmit={handleSubmit(handleJoin)}>
        <fieldset>
          <legend className="hidden">
            <h4>회원 정보</h4>
          </legend>
          <div className="input-box">
            <label htmlFor="email">
              이메일
              <span className="errorMsg">
                {errors && errors.email?.message}
              </span>
            </label>
            <input
              type="text"
              id="email"
              placeholder="이메일을 입력하세요"
              {...register("email", {
                required: "이메일을 입력하세요.",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "이메일 형식이 아닙니다.",
                },
              })}
            />
          </div>
          <div className="input-box">
            <label htmlFor="password">
              비밀번호
              <span className="errorMsg">
                {errors && errors.password?.message}
              </span>
            </label>
            <input
              type="password"
              id="password"
              placeholder="비밀번호를 입력하세요"
              {...register("password", {
                required: "비밀번호를 입력하세요.",
                pattern: {
                  value: /^(?=.*[a-z])(?=.*\d)(?=.*[\W_])[a-z\d\W_]+$/,
                  message: "영문, 숫자, 특수문자를 모두 포함해주세요.",
                },
              })}
            />
          </div>
          <div className="input-box">
            <label htmlFor="passwordChk">
              비밀번호 확인
              <span className="errorMsg">
                {errors && errors.passwordChk?.message}
              </span>
            </label>
            <input
              type="password"
              id="passwordChk"
              placeholder="비밀번호를 다시 입력하세요"
              {...register("passwordChk", {
                required: "비밀번호를 입력하세요.",
                validate: {
                  matchPassword: (value) => {
                    const { password } = getValues();
                    return password === value || "비밀번호가 일치하지 않습니다";
                  },
                },
              })}
            />
          </div>
        </fieldset>

        <fieldset>
          <legend className="hidden">
            <h4>개인 정보</h4>
          </legend>
          <div className="input-box">
            <label htmlFor="name">
              이름
              <span className="errorMsg">{errors && errors.name?.message}</span>
            </label>
            <input
              type="text"
              id="name"
              placeholder="이름을 입력하세요"
              {...register("name", {
                required: "이름을 입력하세요.",
                minLength: {
                  value: 2,
                  message: "이름을 2글자 이상 입력하세요.",
                },
              })}
            />
          </div>
          <div className="input-box">
            <label htmlFor="phone1">
              휴대폰 번호
              <span className="errorMsg">
                {errors?.phone1
                  ? errors.phone1?.message
                  : errors?.phone2
                    ? errors.phone2?.message
                    : errors?.phone3 && errors.phone3?.message}
              </span>
            </label>
            <div className="input-phone">
              <input
                type="tel"
                id="phone1"
                maxLength={3}
                placeholder="010"
                {...register("phone1", {
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
                {...register("phone2", {
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
                {...register("phone3", {
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
            <label htmlFor="birth" className="non-required">
              생년월일
              <span className="errorMsg">
                {errors && errors.birth?.message}
              </span>
            </label>
            <input
              type="tel"
              id="birth"
              maxLength={8}
              {...register("birth", {
                minLength: {
                  value: 8,
                  message: "생년월일 8자리를 입력해주세요.",
                },
                pattern: {
                  value: /^[0-9]*$/,
                  message: "숫자만 입력해주세요.",
                },
              })}
              placeholder="20020101"
            />
          </div>
        </fieldset>
        <div className="btn-box">
          <Button onClick={() => setStep(1)} bgColor="light" size="full">
            이전으로
          </Button>
          <Submit size="full">가입하기</Submit>
        </div>
      </form>
    </section>
  );
};

export default Join;
