"use client";

import Button from "@/components/Button/Button";
import { AirportData, CodeState } from "@/types";
import Image from "next/image";
import { useEffect, useState } from "react";
import { ISearchParams } from "./SearchInfo";
import "./SearchInfo.scss";
import { convertToKor } from "./SearchModals/PassengersModal";
import { formatDate } from "./SearchModals/ScheduleModal";

const SearchInfoBox = ({
  params,
  code,
  handleChange,
}: {
  params: ISearchParams;
  code: CodeState<AirportData>;
  handleChange: () => void;
}) => {
  const [isMounted, setIsMounted] = useState(false);

  const origin = params.originLocationCode;
  const dest = params.destinationLocationCode;
  const depDate = params.departureDate;
  const returnDate = params.returnDate;
  const adults = params.adults;
  const children = params.children;
  const infants = params.infants;
  const travelClass = params.travelClass;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="info-layout">
      <div className="info-wrapper">
        <div className="info-main">
          <div className="route large">
            <div className="schedule-item">
              <span className="schedule-title">출발</span>
              <span className="schedule-contents">
                {code[origin].value} ({origin})
              </span>
            </div>
            <div className="route-way">
              {returnDate ? (
                <div className="img-box">
                  <Image
                    src="/img/icon-roundtrip-gray.svg"
                    alt="왕복"
                    width={0}
                    height={0}
                    sizes="100%"
                  />
                  <span className="hidden">왕복</span>
                </div>
              ) : (
                <div className="img-box">
                  <Image
                    src="/img/icon-oneway-gray.svg"
                    alt="편도"
                    width={0}
                    height={0}
                    sizes="100%"
                  />
                  <span className="hidden">편도</span>
                </div>
              )}
            </div>
            <div className="schedule-item">
              <span className="schedule-title">도착</span>
              <span className="schedule-contents">
                {code[dest].value} ({dest})
              </span>
            </div>
          </div>

          <div className="itinerary small">
            <div className="schedule-item">
              <span className="schedule-title">
                {returnDate ? `출발일 - 도착일` : `출발일`}
              </span>
              <span className="schedule-contents">
                {`${formatDate(new Date(depDate!)).formattedDate}${returnDate ? ` ~ ${formatDate(new Date(returnDate)).formattedDate}` : ""}`}
              </span>
            </div>
          </div>

          <div className="passenger small">
            <div className="schedule-item">
              <span className="schedule-title">인원, 좌석 등급</span>
              <span className="schedule-contents">
                {`성인 ${adults}명${children ? `, 소아 ${children}명` : ""}${infants ? `, 유아 ${infants}명` : ""}, ${travelClass ? convertToKor(travelClass) : "모든 클래스"}`}
              </span>
            </div>
          </div>

          <div className="search-button">
            <Button size="sm" onClick={() => handleChange()}>
              재검색
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchInfoBox;
