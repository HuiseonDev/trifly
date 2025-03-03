import { AirportData, CodeState, OrderItem, OrderItineraries } from "@/types";
import React from "react";
import "./Journery.scss";
import Image from "next/image";

const Journey = async ({
  data,
  code,
}: {
  data: OrderItem;
  code: CodeState<AirportData>;
}) => {
  const itinerary = data?.itineraries.map((item, idx) => {
    const arrivalCode =
      item.segments.length >= 2
        ? item.segments[1].arrival.iataCode
        : item.segments[0].arrival.iataCode;

    const departureCode = item.segments[0].departure.iataCode;

    return (
      <div className="ticket-detail-item" key={idx}>
        <div className="journey-box">
          <div className="journey">
            <div className="box departure">
              <span className="airport-code">{departureCode}</span>
              <span className="airport-kr">
                {code[departureCode] ? code[departureCode].value : ""}
              </span>
              <span className="airline-at">
                {item.segments[0].departure.at.substring(0, 10)}
              </span>
            </div>

            <div className="stopover">
              <div className="img-box">
                <Image
                  src="/img/icon-airline.svg"
                  alt="airline"
                  width={0}
                  height={0}
                  sizes="100%"
                />
              </div>
              <span className="stopover-number">
                {item.segments.length >= 2
                  ? `경유 ${item.segments.length - 1}회`
                  : "직항"}
              </span>
            </div>

            <div className="box arrival">
              <div className="circle" />
              <span className="airport-code">{arrivalCode}</span>
              <span className="airport-kr">
                {code[arrivalCode] ? code[arrivalCode].value : ""}
              </span>
              <span className="airport-kr"></span>
              <span className="airline-at">
                {item.segments[0].arrival.at.substring(0, 10)}
              </span>
            </div>
          </div>
        </div>

        <section className="table-box">
          <div className="table-top">
            <table>
              <caption className="hidden">예약 내역 리스트</caption>
              <thead>
                <tr>
                  <th>예약 번호</th>
                  <th>예약일</th>
                  <th>출발일</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{data.reservationId.substring(0, 6)}</td>
                  <td>
                    {data.createdAt.substring(0, 10).replaceAll(".", "-")}
                  </td>
                  <td>{item.segments[0].departure.at.substring(0, 10)}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="table-bottom">
            <table>
              <thead>
                <tr>
                  <th>인원</th>
                  <th>여정</th>
                  <th>총 금액</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{data.passengers?.length}</td>
                  <td>
                    {item.segments.length >= 2
                      ? `${item.segments[0].departure.iataCode} - ${item.segments[item.segments.length - 1].arrival.iataCode}`
                      : `${item.segments[0].departure.iataCode} - ${item.segments[0].arrival.iataCode}`}
                  </td>
                  <td>
                    {Number(data.totalPrice.split(".")[0]).toLocaleString(
                      "ko-KR",
                    )}{" "}
                    원
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    );
  });

  return (
    <>
      <div className="reservation-box">{itinerary}</div>
    </>
  );
};

export default Journey;
