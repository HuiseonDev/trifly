"use client";

import { modalState, userTestVisitedState } from "@/atoms/atoms";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import "./UserTest.scss";
import UserTestMain from "./UserTestMain";
import UserTestPage from "./UserTestPage";

export const getTitleByPath = (path: string) => {
  if (path.includes("ticket-result")) return "항공권 검색";
  if (path.includes("seat-map")) return "좌석 선택";
  if (path.includes("order")) return "항공권 예약";
  if (path.includes("reservation")) return "예약 확인";
  if (path.includes("footprint")) return "발자국";
  if (path.includes("login")) return "로그인";
  if (path.includes("signup")) return "회원가입";
  return "홈";
};

const UserTest = () => {
  const path = usePathname();
  const setModal = useSetRecoilState(modalState);
  const [userVisited] = useRecoilState(userTestVisitedState);
  const isFirstVisit = path === "/" && userVisited.length < 2;

  const openUserTestModal = () => {
    setModal({
      isOpen: true,
      title: `평가하기 - ${getTitleByPath(path)}`,
      content: (
        <div className="userTest bottomRightUi">
          <UserTestPage path={path} />
        </div>
      ),
      buttonNum: 1,
      handleConfirm: () => {},
    });
  };

  useEffect(() => {
    if (isFirstVisit)
      setModal({
        isOpen: true,
        title: "사용자 테스트 안내",
        content: (
          <div className="userTest">
            <UserTestMain />
          </div>
        ),
        buttonNum: 1,
        handleConfirm: () => {},
      });
  }, []);

  return (
    !isFirstVisit && (
      <div className="userTest-button-wr">
        <button className="userTest-button" onClick={openUserTestModal}>
          <span className="hidden">현재 페이지 평가하기</span>
        </button>
      </div>
    )
  );
};

export default UserTest;
