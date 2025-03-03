import Progress from "@/components/Progress/Progress";
import "./UserTest.scss";

const UserTestMain = () => {
  const textArr = ["홈", "항공권 검색", "항공권 예약", "발자국", "예약 확인"];

  return (
    <>
      <section className="visitedPage">
        <h4 className="hidden">방문 페이지</h4>
        <Progress textArr={textArr} status={1} />
      </section>

      <section className="mission">
        <h4 className="hidden">미션</h4>
        <ol>
          <li>
            <span>1</span>
            <p>
              항공권을 <strong>검색</strong>하고
              <strong> 예약</strong>해보세요!
            </p>
          </li>
          <li>
            <span>2</span>
            <p>
              <strong>나만의 티켓</strong>을 만들어보세요!
            </p>
          </li>
          <li>
            <span>3</span>
            <p>
              <strong>예약하신 내역</strong>을 확인해보세요!
            </p>
          </li>
        </ol>
      </section>

      <section>
        <h4 className="hidden">안내</h4>
        <h5 className="info">
          안녕하세요, 저희 <strong>TriFly</strong> 사용성 테스트에 참여해 주셔서
          감사합니다! <br className="pc" />
          테스트가 진행되는 동안 아래 항목들을 주의 깊게 살펴봐 주세요!
        </h5>
      </section>

      <section className="guide">
        <h4 className="hidden">가이드</h4>

        <ul className="list">
          <li>텍스트가 읽기 편하고, 버튼이나 메뉴를 쉽게 찾을 수 있나요?</li>
          <li>웹페이지에서 원하는 정보를 쉽게 찾을 수 있나요?</li>
          <li>
            검색, 필터, 티켓 꾸미기 등 주요 기능을 사용할 때 문제가 발생하나요?
          </li>
          <li>웹페이지의 속도가 느리거나 오류가 발생한 적이 있나요?</li>
          <li>개선되었으면 하는 부분이 있나요?</li>
        </ul>
      </section>
    </>
  );
};

export default UserTestMain;
