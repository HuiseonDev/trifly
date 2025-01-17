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

const ReturnArrTime = memo(
  ({
    handleFilterChange,
  }: {
    handleFilterChange: Dispatch<SetStateAction<FilterProps>>;
  }) => {
    const [returnArrTime, setReturnArrTime] = useState<number[]>([
      6, 12, 18, 24,
    ]);

    /* -------------------------------------------------------------------------- */
    /*                             출도착 시간 변경 처리                               */
    /* -------------------------------------------------------------------------- */
    useEffect(() => {
      handleFilterChange((prev) => ({ ...prev, returnArrTime }));
    }, [returnArrTime]);

    const handleReturnArrChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);

      setReturnArrTime((prev) => {
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
        <p className="filter-subtitle">오는 날</p>
        <ul className="filter-contents time">
          <li className="time-selection">
            <input
              type="checkbox"
              id="return-ArrTime-0006"
              value={6}
              onChange={handleReturnArrChange}
              checked={returnArrTime.includes(6)}
            />
            <label htmlFor="return-ArrTime-0006">
              <span />
            </label>
            <p className="time-legend first">0시</p>
          </li>
          <li className="time-selection">
            <input
              type="checkbox"
              id="return-ArrTime-0612"
              value={12}
              onChange={handleReturnArrChange}
              checked={returnArrTime.includes(12)}
            />
            <label htmlFor="return-ArrTime-0612">
              <span />
            </label>
            <p className="time-legend">6시</p>
          </li>
          <li className="time-selection">
            <input
              type="checkbox"
              id="return-ArrTime-1218"
              value={18}
              onChange={handleReturnArrChange}
              checked={returnArrTime.includes(18)}
            />
            <label htmlFor="return-ArrTime-1218">
              <span />
            </label>
            <p className="time-legend">12시</p>
          </li>
          <li className="time-selection">
            <input
              type="checkbox"
              id="return-ArrTime-1824"
              value={24}
              onChange={handleReturnArrChange}
              checked={returnArrTime.includes(24)}
            />
            <label htmlFor="return-ArrTime-1824">
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

export default ReturnArrTime;
