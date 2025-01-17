import {
  defaultFilterState,
  filterState,
  recentSearchState,
  SearchResultProps,
  searchResultState,
} from "@/atoms/atoms";
import { useRecoilState, useSetRecoilState } from "recoil";
import Badge from "../Badge/Badge";
import "./RecentSearchResult.scss";

const RecentSearchResult = ({
  data,
  id,
}: {
  data: SearchResultProps;
  id: number;
}) => {
  const [recentSearch, setRecentSearch] = useRecoilState(recentSearchState);
  const setSearchResult = useSetRecoilState(searchResultState);
  const setFilterState = useSetRecoilState(filterState);

  const handleClick = () => {
    if (typeof window !== "undefined") {
      window.location.href = `/ticket-result?originLocationCode=${data.origin.code}&destinationLocationCode=${data.destination.code}&departureDate=${data.schedule.departureDate}${data.tripType === "round" ? `&returnDate=${data.schedule.returnDate}` : ""}&adults=${data.passengers.adults}${data.passengers.children > 0 ? `&children=${data.passengers.children}` : ""}${data.passengers.infants > 0 ? `&infants=${data.passengers.infants}` : ""}${data.nonStop ? `&nonStop=${data.nonStop}` : ""}${data.cabin.cabin ? `&travelClass=${data.cabin.cabin}` : ""}&currencyCode=KRW`;
    }

    setSearchResult(data);

    setFilterState({
      ...defaultFilterState,
      nonStop: data.nonStop,
    });
  };

  const handleDelete = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    const newRecentSearch = [...recentSearch];

    newRecentSearch.splice(id, 1);

    setRecentSearch([...newRecentSearch]);
  };

  return (
    <div className="recent-search-result" onClick={handleClick}>
      <button className="delete-result" type="button" onClick={handleDelete}>
        <img src="/img/icon-close-black.svg" alt="닫기" />
        <i className="hidden">닫기</i>
      </button>

      <div className="recent-search-badge">
        {data.tripType === "oneway" ? (
          <Badge type="secondary">편도</Badge>
        ) : (
          <Badge type="secondary">왕복</Badge>
        )}

        {data.nonStop && <Badge>직항</Badge>}
      </div>

      <div className="route">
        <p>
          {data.origin.value} ({data.origin.code})
        </p>
        {data.tripType === "oneway" ? (
          <img src="/img/icon-oneway-gray.svg" alt="편도" />
        ) : (
          <img src="/img/icon-roundtrip-gray.svg" alt="왕복" />
        )}
        <p>
          {data.destination.value} ({data.destination.code})
        </p>
      </div>
      <div className="schedule">
        {data.tripType === "oneway" ? (
          <p>{data.schedule.departureFormattedDate}</p>
        ) : (
          <p>
            {data.schedule.departureFormattedDate} -{" "}
            {data.schedule.returnFormattedDate}
          </p>
        )}

        <p>{`성인 ${data.passengers.adults}명${data.passengers.children ? `, 소아 ${data.passengers.children}명` : ""}${data.passengers.infants ? `, 유아 ${data.passengers.infants}명` : ""}`}</p>
        <p>{data.cabin.cabinKor}</p>
      </div>
    </div>
  );
};

export default RecentSearchResult;
