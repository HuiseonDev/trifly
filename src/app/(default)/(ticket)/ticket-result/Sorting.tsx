import { FilterProps } from "@/atoms/atoms";
import { ChangeEvent, Dispatch, memo, SetStateAction } from "react";

const Sorting = memo(
  ({
    sortBy,
    handleFilterChange,
    tripType,
  }: {
    sortBy: string;
    handleFilterChange: Dispatch<SetStateAction<FilterProps>>;
    tripType: string;
  }) => {
    const handleSorting = (e: ChangeEvent<HTMLSelectElement>) => {
      handleFilterChange((prev) => ({ ...prev, sortBy: e.target.value }));
    };

    return (
      <div className="result-list-sort">
        <div className="sort-container">
          <p>정렬</p>
          <label className="hidden" htmlFor="sorting">
            항공권 정렬
          </label>
          <select
            className="sorting"
            name="sorting"
            id="sorting"
            value={sortBy}
            onChange={handleSorting}
          >
            <option value="priceLow">가격 낮은 순</option>
            <option value="durationShort">비행시간 짧은 순</option>
            <option value="depDepTime">가는날 출발시간 빠른 순</option>
            {tripType === "round" && (
              <option value="returnDepTime">오는날 출발시간 빠른 순</option>
            )}
            <option value="depArrTime">가는날 도착시간 빠른 순</option>
            {tripType === "round" && (
              <option value="returnArrTime">오는날 도착시간 빠른 순</option>
            )}
          </select>
        </div>
      </div>
    );
  },
);

export default Sorting;
