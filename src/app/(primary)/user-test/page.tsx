import dynamic from "next/dynamic";
import "./user-test.scss";

const UserTestForm = dynamic(() => import("./UserTestForm"), {
  ssr: false,
});

const UserTestTotalPage = () => {
  return (
    <div className="user-test-page">
      <h2 className="title">최종 평가</h2>
      <p className="desc">
        모든 기능을 이용해 보셨네요! 소중한 시간을 내어 주셔서 감사합니다! 🙏
        <br />
        <strong>트리플라이(TriFly)</strong>에 대한
        <strong>전반적인 평가</strong>를 부탁드려요.
      </p>

      <UserTestForm />
    </div>
  );
};

export default UserTestTotalPage;
