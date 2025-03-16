import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import "./PassengersModal.scss";
import Button from "@/components/Button/Button";
import Image from "next/image";
import { useSetRecoilState } from "recoil";
import { ICabin, modalState } from "@/atoms/atoms";
import ItineraryModal from "./ItineraryModal";

export const convertToKor = (
  type: "ECONOMY" | "PREMIUM_ECONOMY" | "BUSINESS" | "FIRST" | "DEFAULT",
) => {
  switch (type) {
    case "ECONOMY":
      return "일반석";
    case "PREMIUM_ECONOMY":
      return "프리미엄 일반석";
    case "BUSINESS":
      return "비즈니스석";
    case "FIRST":
      return "일등석";
    case "DEFAULT":
      return "모든 클래스";
  }
};

interface PassengersModalProps {
  handleClose: Dispatch<SetStateAction<boolean>>;
  passengers: {
    adults: number;
    children: number;
    infants: number;
  };
  setPassengers: (obj: {
    adults: number;
    children: number;
    infants: number;
  }) => void;
  cabin: ICabin;
  setCabin: (obj: ICabin) => void;
}

const PassengersModal = ({
  handleClose,
  passengers,
  setPassengers,
  cabin,
  setCabin,
}: PassengersModalProps) => {
  const [adults, setAdults] = useState(passengers.adults);
  const [children, setChildren] = useState(passengers.children);
  const [infants, setInfants] = useState(passengers.infants);
  const [cabinType, setCabinType] = useState(cabin.cabin);
  const setModal = useSetRecoilState(modalState);

  const handleCabin = (e: ChangeEvent<HTMLInputElement>) => {
    setCabinType(
      e.target.value as
        | "ECONOMY"
        | "PREMIUM_ECONOMY"
        | "BUSINESS"
        | "FIRST"
        | "DEFAULT",
    );
  };

  const handlePassengers = () => {
    setPassengers({
      adults,
      children,
      infants,
    });

    setCabin({
      cabin: cabinType,
      cabinKor: convertToKor(cabinType),
    });

    handleClose(false);
  };

  return (
    <ItineraryModal handleClose={handleClose}>
      <div className="passengers-modal">
        <button
          className="close-button img-box"
          type="button"
          onClick={() => handleClose(false)}
        >
          <Image
            src="/img/icon-close-black.svg"
            alt="닫기"
            width={0}
            height={0}
            sizes="100%"
          />
          <span className="hidden">닫기</span>
        </button>

        <div className="passengers-modal-contents">
          <div className="passengers-section">
            <div className="section-title">
              <h4>탑승 인원</h4>
              <p>나이는 탑승일 기준으로 선택해주세요.</p>
            </div>
            <div className="passengers-category">
              <h5>성인</h5>
              <p>만 12세 이상</p>
              <div className="counter">
                <button
                  className="counter-button img-box"
                  type="button"
                  id="adults"
                  onClick={() => {
                    if (adults > 1) {
                      setAdults((state) => state - 1);
                    } else {
                      setModal({
                        isOpen: true,
                        title: "안내",
                        content:
                          "만 14세 미만 승객은 보호자와 함께 탑승해야 합니다.\n성인을 1명 이상 선택하세요!",
                        buttonNum: 1,
                        handleConfirm: () => {},
                      });
                    }
                  }}
                >
                  <Image
                    src="/img/icon-minus.svg"
                    alt="제외"
                    width={0}
                    height={0}
                    sizes="100%"
                  />
                  <span className="hidden">1명 제외</span>
                </button>
                <p>{adults}</p>
                <button
                  className="counter-button img-box"
                  type="button"
                  id="adults"
                  onClick={() => setAdults((state) => state + 1)}
                >
                  <Image
                    src="/img/icon-plus.svg"
                    alt="추가"
                    width={0}
                    height={0}
                    sizes="100%"
                  />
                  <span className="hidden">1명 추가</span>
                </button>
              </div>
            </div>
            <div className="passengers-category">
              <h5>소아</h5>
              <p>만 12세 미만</p>
              <div className="counter">
                <button
                  className="counter-button img-box"
                  type="button"
                  id="children"
                  onClick={() => {
                    if (children > 0) {
                      setChildren((state) => state - 1);
                    }
                  }}
                >
                  <Image
                    src="/img/icon-minus.svg"
                    alt="제외"
                    width={0}
                    height={0}
                    sizes="100%"
                  />
                  <span className="hidden">1명 제외</span>
                </button>
                <p>{children}</p>
                <button
                  className="counter-button img-box"
                  type="button"
                  id="children"
                  onClick={() => {
                    setChildren((state) => state + 1);
                  }}
                >
                  <Image
                    src="/img/icon-plus.svg"
                    alt="추가"
                    width={0}
                    height={0}
                    sizes="100%"
                  />
                  <span className="hidden">1명 추가</span>
                </button>
              </div>
            </div>
            <div className="passengers-category">
              <h5>유아</h5>
              <p>24개월 미만</p>
              <div className="counter">
                <button
                  className="counter-button img-box"
                  type="button"
                  id="infants"
                  onClick={() => {
                    if (infants > 0) {
                      setInfants((state) => state - 1);
                    }
                  }}
                >
                  <Image
                    src="/img/icon-minus.svg"
                    alt="제외"
                    width={0}
                    height={0}
                    sizes="100%"
                  />
                  <span className="hidden">1명 제외</span>
                </button>
                <p>{infants}</p>
                <button
                  className="counter-button img-box"
                  type="button"
                  id="infants"
                  onClick={() => {
                    setInfants((state) => state + 1);
                  }}
                >
                  <Image
                    src="/img/icon-plus.svg"
                    alt="추가"
                    width={0}
                    height={0}
                    sizes="100%"
                  />
                  <span className="hidden">1명 추가</span>
                </button>
              </div>
            </div>
          </div>
          <div className="cabin-section">
            <div className="section-title">
              <h4>좌석 등급</h4>
            </div>

            <div className="no-select">
              <div className="cabin">
                <input
                  type="radio"
                  name="cabin"
                  value="DEFAULT"
                  id="DEFAULT"
                  checked={cabinType === "DEFAULT"}
                  onChange={handleCabin}
                />
                <label htmlFor="DEFAULT">모든 클래스</label>
              </div>
            </div>

            <div className="cabins">
              <div className="cabin">
                <input
                  type="radio"
                  name="cabin"
                  value="ECONOMY"
                  id="ECONOMY"
                  checked={cabinType === "ECONOMY"}
                  onChange={handleCabin}
                />
                <label htmlFor="ECONOMY">일반석</label>
              </div>
              <div className="cabin">
                <input
                  type="radio"
                  name="cabin"
                  value="PREMIUM_ECONOMY"
                  id="PREMIUM_ECONOMY"
                  checked={cabinType === "PREMIUM_ECONOMY"}
                  onChange={handleCabin}
                />
                <label htmlFor="PREMIUM_ECONOMY">프리미엄 일반석</label>
              </div>
              <div className="cabin">
                <input
                  type="radio"
                  name="cabin"
                  value="BUSINESS"
                  id="BUSINESS"
                  checked={cabinType === "BUSINESS"}
                  onChange={handleCabin}
                />
                <label htmlFor="BUSINESS">비즈니스석</label>
              </div>
              <div className="cabin">
                <input
                  type="radio"
                  name="cabin"
                  value="FIRST"
                  id="FIRST"
                  checked={cabinType === "FIRST"}
                  onChange={handleCabin}
                />
                <label htmlFor="FIRST">일등석</label>
              </div>
            </div>
          </div>

          <div className="passengers-select-done">
            <Button onClick={handlePassengers}>완료</Button>
          </div>
        </div>
      </div>
    </ItineraryModal>
  );
};

export default PassengersModal;
