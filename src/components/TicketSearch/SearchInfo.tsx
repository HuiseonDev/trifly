"use client";

import { AirportData, CodeState } from "@/types";
import { useState } from "react";
import SearchInfoBox from "./SearchInfoBox";
import TicketSearchBox from "./TicketSearchBox";

export interface ISearchParams {
  originLocationCode: string;
  destinationLocationCode: string;
  departureDate: string;
  returnDate?: string;
  adults: string;
  children?: string;
  infants?: string;
  nonStop?: string;
  travelClass: "ECONOMY" | "PREMIUM_ECONOMY" | "BUSINESS" | "FIRST";
  currencyCode: "KRW";
}

interface SearchInfoProps {
  params: ISearchParams;
  code: CodeState<AirportData>;
  airport: AirportData[];
}

const SearchInfo = ({ params, code, airport }: SearchInfoProps) => {
  const [searchMode, setSearchMode] = useState(false);

  const handleChange = () => {
    setSearchMode(!searchMode);
  };

  return (
    <>
      {searchMode ? (
        <TicketSearchBox
          params={params}
          code={code}
          airport={airport}
          handleChange={handleChange}
        />
      ) : (
        <SearchInfoBox
          params={params}
          code={code}
          handleChange={handleChange}
        />
      )}
    </>
  );
};

export default SearchInfo;
