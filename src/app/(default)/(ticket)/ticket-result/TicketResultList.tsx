import { AirlineData, CodeState, OffersSearchData } from "@/types";
import TicketResultItem from "./TicketResultItem";
import "./TicketResultList.scss";
import { Virtuoso } from "react-virtuoso";
import { useCallback } from "react";

const TicketResultList = ({
  user,
  data,
  airline,
}: {
  user: boolean;
  data: OffersSearchData[];
  airline: CodeState<AirlineData>;
}) => {
  const loadMore = useCallback(() => {
    return setTimeout(() => {}, 200); // 디바운스
  }, []);

  return (
    <Virtuoso
      className="result-list"
      data={data}
      useWindowScroll
      totalCount={data.length}
      endReached={loadMore}
      overscan={10}
      itemContent={(index, item) => (
        <TicketResultItem
          key={item.id}
          user={user}
          item={item}
          airline={airline}
          isLast={index === data.length - 1}
        />
      )}
    />
  );
};

export default TicketResultList;
