"use client";

import Badge from "@/components/Badge/Badge";
import Button from "@/components/Button/Button";
import { FetchOrderListScroll } from "@/lib/FetchOrderListScroll";
import { useRouter } from "next/navigation";
import React from "react";
import { useInfiniteQuery } from "react-query";
import "./OrderList.scss";

const OrdersList = ({ keyword, page }: { keyword: string; page: string }) => {
  const router = useRouter();

  const handleClick = (_id: number) => {
    router.push(`/reservation/${_id}`);
  };
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ["reservations", keyword],
      queryFn: ({ pageParam = "1" }) =>
        FetchOrderListScroll(pageParam, keyword),
      getNextPageParam: (lastPage) => {
        if (!lastPage || !lastPage.pagination) {
          return false;
        }

        const { page, totalPages } = lastPage.pagination;
        return page < totalPages ? page + 1 : false;
      },
    });

  const pages = data?.pages;
  // const item = pages?.map((page) => page.item);

  // 로딩 상태 처리
  if (isLoading) {
    return <div className="infinite-scroll-loading">로딩 중...</div>;
  }

  if (!data || data.pages.length === 0) {
    return <div>데이터가 없습니다.</div>;
  }

  return (
    <div>
      <table className="reservation-table">
        <thead>
          <tr>
            <th className="travel">왕복/편도</th>
            <th className="reservation-number">예약 번호</th>
            <th className="departure">출발</th>
            <th className="arrival">도착</th>
            <th className="reservation-date">예약일</th>
            <th className="schedule">출발일</th>
            <th className="personnel">인원</th>
            <th className="total">총 금액</th>
          </tr>
        </thead>
        <tbody className="ordersitem">
          {pages?.map((page: { item: any[] }, pageIndex: number) =>
            page.item.map((order: any, index: number) => (
              <tr
                className="item-table"
                key={order._id}
                onClick={() => handleClick(order._id)}
                style={{ cursor: "pointer" }}
              >
                <td className="travel">
                  {order.itineraries.length === 2 ? (
                    <Badge>왕복</Badge>
                  ) : (
                    <Badge type="secondary">편도</Badge>
                  )}
                </td>
                <td className="reservation-number">
                  <h3>{order.reservationId.substring(0, 6)}</h3>
                </td>
                <td className="departure">
                  {order.itineraries[0].segments[0].departure.iataCode}
                </td>
                <td className="arrival">
                  {order.itineraries[0].segments.length === 2
                    ? order.itineraries[0].segments[1].arrival.iataCode
                    : order.itineraries[0].segments[0].arrival.iataCode}
                </td>
                <td className="reservation-date">
                  {order.createdAt.substring(0, 10).replaceAll(".", "-")}
                </td>
                <td className="schedule">
                  {order.itineraries[0].segments[0].departure.at.substring(
                    0,
                    10,
                  )}
                </td>
                <td className="personnel">{order.passengers?.length}</td>
                <td className="total">
                  {Number(order.totalPrice).toLocaleString("ko-KR")} 원
                </td>
              </tr>
            )),
          )}
        </tbody>
      </table>
      {isFetchingNextPage && (
        <div className="infinite-scroll-more-loading">
          예약 내역 불러오는중...
        </div>
      )}
      {hasNextPage && !isFetchingNextPage && (
        <div className="infinite-scroll-button">
          <Button bgColor="light" onClick={() => fetchNextPage()}>
            더보기
          </Button>
        </div>
      )}
    </div>
  );
};

export default OrdersList;
