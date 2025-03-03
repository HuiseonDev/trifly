"use server";

import { auth } from "@/auth";

const SERVER = process.env.NEXT_PUBLIC_MARKET_API_SERVER;
const CLIENTID = process.env.NEXT_PUBLIC_MARKET_API_CLIENT_ID as string;

interface FormData {
  content?: string;
  rating?: number;
  impression?: string;
  confused?: string;
  best?: string;
  improvement?: string;
  recommend?: string;
  satisfy?: string;
}

const userTestAction = async (
  page: string,
  formData: FormData,
  userAgent: string,
) => {
  const session = await auth();

  const getTitleByPath = (path: string) => {
    if (path.includes("ticket-result")) return "항공권 검색";
    if (path.includes("seat-map")) return "좌석 선택";
    if (path.includes("order")) return "항공권 예약";
    if (path.includes("reservation")) return "예약 확인";
    if (path.includes("footprint")) return "발자국";
    if (path.includes("login")) return "로그인";
    if (path.includes("signup")) return "회원가입";
    return "홈";
  };

  const userTestData = {
    type: getTitleByPath(page),
    title: page,
    content: formData.content,
    tag: userAgent,
  };

  const userFinalTestData = {
    type: page,
    title: page,
    content: `{rating: "${formData.rating}",
"impression": "${formData.impression}",
"confused": "${formData.confused}",
"best": "${formData.best}",
"improvement": "${formData.improvement}",
"recommend": "${formData.recommend}",
"satisfy": "${formData.satisfy}"}`,
    tag: userAgent,
  };

  const res = await fetch(`${SERVER}/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "client-id": CLIENTID,
      Authorization: `Bearer ${session?.accessToken}`,
    },
    body: JSON.stringify(page === "final" ? userFinalTestData : userTestData),
  });

  const data = await res.json();
  if (!data.ok) return data.errors ? data.errors[0].msg : data.message;
  return data;
};

export default userTestAction;
