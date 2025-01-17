"use client";

import { filterState, searchResultState } from "@/atoms/atoms";
import Button from "@/components/Button/Button";
import useFilters from "@/hook/useFilters";
import { AirlineData, CodeState, OffersSearchData } from "@/types";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import Filter from "./Filter";
import TicketResultList from "./TicketResultList";

const Result = ({
  user,
  data,
  airline,
  returnDate,
}: {
  user: boolean;
  data: OffersSearchData[];
  airline: CodeState<AirlineData>;
  returnDate?: string;
}) => {
  const searchResult = useRecoilValue(searchResultState);
  const [filters, setFilters] = useRecoilState(filterState);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  /* -------------------------------------------------------------------------- */
  /*                        항공편 조회 결과에 해당하는 항공사만 추출                     */
  /* -------------------------------------------------------------------------- */
  const extractCarrierCodes = (offers: OffersSearchData[]) => {
    if (offers) {
      return offers.flatMap((offer) =>
        offer.itineraries.flatMap((itinerary) =>
          itinerary.segments.map((segment) => segment.carrierCode),
        ),
      );
    }

    return null;
  };

  // carrierCodes 배열
  const carrierCodes = useMemo(() => {
    return [...new Set(extractCarrierCodes(data))].sort();
  }, [data]);

  // 가격 배열
  const prices = useMemo(() => {
    const priceList: number[] = [];
    data.forEach((item) => priceList.push(Number(item.price.grandTotal)));
    return priceList;
  }, [data]);

  /* -------------------------------------------------------------------------- */
  /*                                  필터 적용                                   */
  /* -------------------------------------------------------------------------- */
  const filteredData = useFilters(data, filters, prices, returnDate);

  /* -------------------------------------------------------------------------- */
  /*                         모바일 환경에서 뒤편 스크롤 고정                           */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    if (isFilterOpen) {
      document
        .querySelector("html")!
        .setAttribute("style", "overflow: hidden;");
    } else {
      document.querySelector("html")!.removeAttribute("style");
    }
  }, [isFilterOpen]);

  return (
    <section className="search-result">
      <div className="search-result-layout">
        <h3 className="hidden">항공권 검색 결과</h3>

        <div className={`search-filter ${isFilterOpen && "is-active"}`}>
          <h4 className="hidden">필터</h4>

          <div className="mobile-filter-header mo">
            <h4>정렬 및 필터</h4>
            <button
              className="close-button"
              onClick={() => setIsFilterOpen(false)}
            >
              <div className="img-box">
                <Image
                  src="/img/icon-close-black.svg"
                  alt="닫기"
                  width={0}
                  height={0}
                  sizes="100%"
                />
              </div>
              <span className="hidden">필터 닫기</span>
            </button>
          </div>
          <div className="mobile-filter-container">
            <Filter
              airline={airline}
              carrierCodes={carrierCodes}
              tripType={returnDate ? "round" : "oneway"}
              nonStop={searchResult.nonStop}
              prices={prices}
              filters={filters}
              handleFilterChange={setFilters}
            />
          </div>

          <div className="mobile-filter-done mo">
            <Button size="full" onClick={() => setIsFilterOpen(false)}>
              선택 완료
            </Button>
          </div>
        </div>

        {filteredData.length ? (
          <div className="search-result-list">
            <div className="result-list-header">
              <div className="result-list-text">
                <p className="result-list-title">
                  검색결과 총 <span>{filteredData.length}</span>건
                </p>
                <p className="result-list-description">
                  성인 1인 기준 {returnDate ? "왕복 " : "편도 "}
                  요금입니다. <span>(세금 및 수수료 모두 포함)</span>
                </p>
              </div>
            </div>

            <TicketResultList
              user={user}
              data={filteredData}
              airline={airline}
            />
          </div>
        ) : (
          <div className="no-search-result">
            <div className="img-box">
              <Image
                src="/img/icon-no-result.svg"
                alt="검색 결과 없음"
                width={0}
                height={0}
                sizes="100%"
              />
            </div>
            <div className="no-result-message">
              <p className="no-result-title">항공권을 찾을 수 없습니다.</p>
              <p className="no-result-description">
                조건에 맞는 항공편을 다시 검색해보세요.
              </p>
            </div>
          </div>
        )}
      </div>

      {!isFilterOpen && (
        <button
          className="filter-button"
          type="button"
          onClick={() => setIsFilterOpen(true)}
        >
          <div className="img-box">
            <Image
              src="/img/icon-filter.svg"
              alt="필터"
              width={0}
              height={0}
              sizes="100%"
            />
          </div>
          <span>필터</span>
        </button>
      )}
    </section>
  );
};

export default Result;
