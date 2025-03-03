"use client";

import Progress from "@/components/Progress/Progress";

const OrderProgress = ({ orderStatus = 1 }) => {
  const orderPages = ["약관 동의", "입력 및 결제", "좌석 선택", "예약 완료"];
  return <Progress textArr={orderPages} status={orderStatus} />;
};

export default OrderProgress;
