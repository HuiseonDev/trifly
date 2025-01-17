"use client";

import { FilterProps } from "@/atoms/atoms";
import Accordion from "@/components/Accordion/Accordion";
import AccordionBody from "@/components/Accordion/AccordionBody";
import AccordionHeader from "@/components/Accordion/AccordionHeader";
import AccordionItem from "@/components/Accordion/AccordionItem";
import AirlineFilter from "@/components/Filters/AirlineFilter";
import NonStopFilter from "@/components/Filters/NonstopFilter";
import OriginArrTime from "@/components/Filters/OriginArrTime";
import OriginDepTime from "@/components/Filters/OriginDepTime";
import PriceFilter from "@/components/Filters/PriceFilter";
import ReturnArrTime from "@/components/Filters/ReturnArrTime";
import ReturnDepTime from "@/components/Filters/ReturnDepTime";
import { AirlineData, CodeState } from "@/types";
import { Dispatch, SetStateAction } from "react";
import "./Filter.scss";
import Sorting from "./Sorting";

const Filter = ({
  airline, // DB에 저장한 항공사 코드
  carrierCodes, // 검색 결과 운항하는 항공사 코드
  tripType,
  nonStop,
  prices,
  filters,
  handleFilterChange,
}: {
  airline: CodeState<AirlineData>;
  carrierCodes: string[];
  tripType: string;
  nonStop: boolean;
  prices: number[];
  filters: FilterProps;
  handleFilterChange: Dispatch<SetStateAction<FilterProps>>;
}) => {
  return (
    <div className="filter">
      <Sorting
        sortBy={filters.sortBy}
        handleFilterChange={handleFilterChange}
        tripType={"round"}
      />
      {/* 경유 포함 검색했을 시 필터링 */}
      {!nonStop && (
        <Accordion type="small">
          <AccordionItem eventKey={1}>
            <AccordionHeader>
              <p className="filter-title">경유</p>
            </AccordionHeader>
            <AccordionBody>
              <NonStopFilter
                nonStop={filters.nonStop}
                handleFilterChange={handleFilterChange}
              />
            </AccordionBody>
          </AccordionItem>
        </Accordion>
      )}

      {/* 출발 시간 필터링 */}
      <Accordion type="small">
        <AccordionItem eventKey={1}>
          <AccordionHeader>
            <p className="filter-title">출발시간</p>
          </AccordionHeader>
          <AccordionBody>
            <OriginDepTime
              originDepTime={filters.originDepTime}
              handleFilterChange={handleFilterChange}
            />
            {tripType === "round" && (
              <ReturnDepTime
                returnDepTime={filters.returnDepTime}
                handleFilterChange={handleFilterChange}
              />
            )}
          </AccordionBody>
        </AccordionItem>
      </Accordion>

      {/* 도착 시간 필터링 */}
      <Accordion type="small">
        <AccordionItem eventKey={1}>
          <AccordionHeader>
            <p className="filter-title">도착시간</p>
          </AccordionHeader>
          <AccordionBody>
            <OriginArrTime
              originArrTime={filters.originArrTime}
              handleFilterChange={handleFilterChange}
            />
            {tripType === "round" && (
              <ReturnArrTime handleFilterChange={handleFilterChange} />
            )}
          </AccordionBody>
        </AccordionItem>
      </Accordion>

      {/* 항공사 필터링 */}
      <Accordion type="small">
        <AccordionItem eventKey={1}>
          <AccordionHeader>
            <p className="filter-title">항공사 선택</p>
          </AccordionHeader>
          <AccordionBody>
            <AirlineFilter
              airline={airline}
              carrierCodes={carrierCodes}
              allianceChk={filters.allianceChk}
              selectedAirlines={filters.airline}
              handleFilterChange={handleFilterChange}
            />
          </AccordionBody>
        </AccordionItem>
      </Accordion>

      {/* 최대 가격 필터링 */}
      {prices.length >= 2 && (
        <Accordion type="small">
          <AccordionItem eventKey={1}>
            <AccordionHeader>
              <p className="filter-title">가격대 (탑승객 전체)</p>
            </AccordionHeader>
            <AccordionBody>
              <PriceFilter
                prices={prices}
                maxPrice={filters.maxPrice}
                handleFilterChange={handleFilterChange}
              />
            </AccordionBody>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
};

export default Filter;
