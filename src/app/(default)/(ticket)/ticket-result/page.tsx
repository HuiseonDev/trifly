import { auth } from "@/auth";
import SearchInfo from "@/components/TicketSearch/SearchInfo";
import fetchAuth from "@/data/fetch/fetchAuth";
import { fetchCodes } from "@/data/fetch/fetchCode";
import {
  AirlineData,
  AirportData,
  OffersSearch,
  OffersSearchData,
} from "@/types";
import Result from "./Result";
import "./Result.scss";

const AMADEUS_API_SERVER = process.env.NEXT_PUBLIC_AMADEUS_API_SERVER;

export interface IPageProps {
  searchParams: {
    originLocationCode: string;
    destinationLocationCode: string;
    departureDate: string;
    returnDate?: string;
    adults: string;
    children?: string;
    infants?: string;
    nonStop?: string;
    travelClass?: "ECONOMY" | "PREMIUM_ECONOMY" | "BUSINESS" | "FIRST";
    currencyCode: "KRW";
  };
}

const fetchTicketSearch = async (
  query: string,
): Promise<OffersSearchData[]> => {
  let accessToken = await fetchAuth();

  const url = `${AMADEUS_API_SERVER}/v2/shopping/flight-offers?${query}`;

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      next: { revalidate: 0 },
    });

    if (res.status === 401) {
      accessToken = await fetchAuth();

      const reRes = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        next: { revalidate: 0 },
      });

      const reResJson: OffersSearch = await reRes.json();

      if (!reResJson.meta) {
        throw new Error("검색에 실패했습니다.");
      }

      return reResJson.data;
    }

    const resJson: OffersSearch = await res.json();

    if (!resJson.meta) {
      throw new Error("검색에 실패했습니다.");
    }

    return resJson.data;
  } catch (e) {
    console.error(e);
    throw new Error("오류가 발생했습니다.");
  }
};

const TicketResult = async ({ searchParams }: IPageProps) => {
  const session = await auth();
  const user = !!session?.user;
  const { returnDate } = searchParams;

  const { code, airportCode } = await fetchCodes<AirportData>();
  const { code: airline } = await fetchCodes<AirlineData>();
  const queryString = new URLSearchParams(searchParams).toString();
  const data = await fetchTicketSearch(queryString);

  /* -------------------------------------------------------------------------- */
  /*                 carrierCode가 validCarrierCodes에 포함된 객체만 필터링           */
  /* -------------------------------------------------------------------------- */
  const filteredData = data.filter((offer) =>
    offer.itineraries.every((itinerary) =>
      itinerary.segments.every((segment) =>
        Object.keys(airline).includes(segment.carrierCode),
      ),
    ),
  );

  return (
    <>
      <div className="result">
        <h2 className="hidden">항공권 검색 결과</h2>
        <section className="search-info full-width">
          <h3 className="hidden">항공권 검색 정보</h3>
          <SearchInfo code={code} airport={airportCode} />
        </section>
        <Result
          data={filteredData}
          user={user}
          airline={airline}
          returnDate={returnDate}
        />
      </div>
    </>
  );
};

export default TicketResult;
