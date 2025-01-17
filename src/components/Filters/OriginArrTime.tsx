import "@/app/(default)/(ticket)/ticket-result/Filter.scss";
import { FilterProps } from "@/atoms/atoms";
import {
  ChangeEvent,
  Dispatch,
  memo,
  SetStateAction,
  useEffect,
  useState,
} from "react";

const OriginArrTime = memo(
  ({
    originArrTime: initialOriginArrTime,
    handleFilterChange,
  }: {
    originArrTime: number[];
    handleFilterChange: Dispatch<SetStateAction<FilterProps>>;
  }) => {
    const [originArrTime, setOriginArrTime] =
      useState<number[]>(initialOriginArrTime);

    /* -------------------------------------------------------------------------- */
    /*                             출도착 시간 변경 처리                               */
    /* -------------------------------------------------------------------------- */
    useEffect(() => {
      handleFilterChange((prev) => ({ ...prev, originArrTime }));
    }, [originArrTime]);

    const handleOriginArrChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);

      setOriginArrTime((prev) => {
        if (!prev) {
          return [value];
        }

        if (e.target.checked) {
          return [...prev, value];
        }
        return prev.filter((time) => time !== value);
      });
    };

    return (
      <div>
        <p className="filter-subtitle">가는 날</p>
        <ul className="filter-contents time">
          <li className="time-selection">
            <input
              type="checkbox"
              id="origin-ArrTime-0006"
              value={6}
              onChange={handleOriginArrChange}
              checked={originArrTime.includes(6)}
            />
            <label htmlFor="origin-ArrTime-0006">
              <span />
            </label>
            <p className="time-legend first">0시</p>
          </li>
          <li className="time-selection">
            <input
              type="checkbox"
              id="origin-ArrTime-0612"
              value={12}
              onChange={handleOriginArrChange}
              checked={originArrTime.includes(12)}
            />
            <label htmlFor="origin-ArrTime-0612">
              <span />
            </label>
            <p className="time-legend">6시</p>
          </li>
          <li className="time-selection">
            <input
              type="checkbox"
              id="origin-ArrTime-1218"
              value={18}
              onChange={handleOriginArrChange}
              checked={originArrTime.includes(18)}
            />
            <label htmlFor="origin-ArrTime-1218">
              <span />
            </label>
            <p className="time-legend">12시</p>
          </li>
          <li className="time-selection">
            <input
              type="checkbox"
              id="origin-ArrTime-1824"
              value={24}
              onChange={handleOriginArrChange}
              checked={originArrTime.includes(24)}
            />
            <label htmlFor="origin-ArrTime-1824">
              <span />
            </label>
            <p className="time-legend">18시</p>
            <p className="time-legend last">24시</p>
          </li>
        </ul>
      </div>
    );
  },
);

export default OriginArrTime;
