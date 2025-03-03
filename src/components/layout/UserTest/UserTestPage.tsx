"use client";

import Progress from "@/components/Progress/Progress";
import { getTitleByPath } from "./UserTest";
import Button from "@/components/Button/Button";
import { useForm } from "react-hook-form";
import userTestAction from "@/data/actions/userTestAction";
import { useRecoilState, useSetRecoilState } from "recoil";
import { modalState, userTestVisitedState } from "@/atoms/atoms";
import Link from "next/link";

interface FormData {
  content: string;
}

const UserTestPage = ({ path }: { path: string }) => {
  const setModal = useSetRecoilState(modalState);
  const [userVisited] = useRecoilState(userTestVisitedState);

  const textArr = ["홈", "항공권 검색", "항공권 예약", "발자국", "예약 확인"];
  const missionByPage = {
    홈: "항공권을 검색해보세요!",
    "항공권 검색": "필터 기능을 활용해 원하는 항공권을 검색해보세요!",
    "항공권 예약": "정해진 순서에 따라 항공권을 예약해보세요!",
    "좌석 선택": "원하는 좌석을 선택하고 예약을 완료하세요!",
    "예약 확인":
      "예약한 항공권의 상세 내역을 확인해보세요! 항공권 저장도 가능합니다.",
    발자국:
      "티켓의 이미지를 바꾸고 그림을 그려보세요! 티켓은 저장도 가능합니다!",
    로그인: "이메일, SNS를 통해 로그인을 시도해보세요!",
    회원가입: "회원가입을 하고 triFly의 서비스를 이용해보세요!",
  };

  const { register, handleSubmit, reset } = useForm<FormData>();

  const handleForm = async (formData: FormData) => {
    const res = await userTestAction(path, formData, navigator.userAgent);
    if (res.ok) {
      reset();
      setModal({ isOpen: false }); // '평가하기' 모달 종료

      // '평가 완료 안내' 모달 노출
      setModal({
        isOpen: true,
        title: "안내",
        content: `[ ${getTitleByPath(path)} ]  평가가 제출되었습니다.`,
        buttonNum: 1,
        handleConfirm: () => {},
      });
    }
  };

  return (
    <>
      <div className="scroll-box">
        <section className="visitedPage">
          <h4 className="hidden">방문 페이지</h4>
          <Progress textArr={textArr} status={1} mode="multiple" />
        </section>
        <section className="mission">
          <h4 className="hidden">미션</h4>
          <h5 className="page-mission info">
            {userVisited.length >= 5 ? (
              <p>
                모든 페이지를 확인하였습니다. <br />
                <Link href="/user-test">최종 평가로 이동</Link>
              </p>
            ) : (
              missionByPage[getTitleByPath(path)]
            )}
          </h5>
        </section>
        <section>
          <h4 className="hidden">안내</h4>
          <p className="desc">
            사용하시면서 느낀 점이나 개선이 필요한 부분을
            <strong>하단의 입력란</strong>에 적어주세요.
          </p>
        </section>
        <section className="guide">
          <h4 className="hidden">가이드</h4>
          <ul className="list">
            <li>
              <strong>글씨 크기와 색상은 읽기에 편안했나요?</strong>
            </li>
            <li className="sub">
              텍스트의 크기나 색상은 읽기 어려운 부분은 없었나요?
            </li>
            <li className="sub">
              배경과 텍스트의 대비가 적절해서 가독성이 좋았나요?
            </li>
            <li>
              <strong>
                버튼이나 메뉴가 어디에 있는지 쉽게 알 수 있었나요?
              </strong>
            </li>
            <li className="sub">
              주요 버튼이나 메뉴가 눈에 띄게 배치되어 있었나요?
            </li>
            <li>
              <strong>웹페이지에서 원하는 정보를 쉽게 찾을 수 있나요?</strong>
            </li>
            <li className="sub">
              페이지 내에서 필요한 정보를 빠르게 찾을 수 있었나요?
            </li>
            <li>
              <strong>
                특정 기능(검색, 필터, 클릭 등)을 사용할 때 문제가 발생했나요?
              </strong>
            </li>
            <li className="sub">
              검색, 필터링, 티켓 꾸미기 등의 기능을 사용할 때 불편한 점이나
              오류가 있었나요?
            </li>
            <li className="sub">
              특정 기능을 클릭하거나 사용할 때 반응이 예상과 다르거나 문제가
              발생했나요?
            </li>
            <li>
              <strong>
                웹페이지를 이용하면서 속도가 느리거나 오류가 발생한 적이
                있었나요?
              </strong>
            </li>
            <li className="sub">
              페이지 로딩 속도나 반응 속도가 느리다고 느낀 적이 있었나요?
            </li>
            <li className="sub">
              페이지 내에서 오류 메시지가 나타나거나 동작하지 않는 부분이
              있었나요?
            </li>
            <li>
              <strong>개선되었으면 하는 부분이 있다면 무엇인가요?</strong>
            </li>
            <li className="sub">
              디자인, 기능 등 개선할 수 있는 부분은 어떤 것이 있었나요?
            </li>
          </ul>
        </section>
      </div>

      <form className="fixed-box" onSubmit={handleSubmit(handleForm)}>
        <input
          type="text"
          {...register("content", { required: "평가할 내용을 입력하세요." })}
          placeholder="평가 내용을 입력해주세요."
        />
        <Button type="submit" size="sm">
          제출하기
        </Button>
      </form>
    </>
  );
};

export default UserTestPage;
