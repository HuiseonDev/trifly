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

const ReturnDepTime = memo(
  ({
    returnDepTime: initialReturnDepTime,
    handleFilterChange,
  }: {
    returnDepTime: number[];
    handleFilterChange: Dispatch<SetStateAction<FilterProps>>;
  }) => {
    const [returnDepTime, setReturnDepTime] =
      useState<number[]>(initialReturnDepTime);

    /* -------------------------------------------------------------------------- */
    /*                             출도착 시간 변경 처리                               */
    /* -------------------------------------------------------------------------- */
    useEffect(() => {
      handleFilterChange((prev) => ({ ...prev, returnDepTime }));
    }, [returnDepTime]);

    const handleReturnDepChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);

      setReturnDepTime((prev) => {
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
              id="return-depTime-0006"
              value={6}
              onChange={handleReturnDepChange}
              checked={returnDepTime.includes(6)}
            />
            <label htmlFor="return-depTime-0006">
              <span />
            </label>
            <p className="time-legend first">0시</p>
          </li>
          <li className="time-selection">
            <input
              type="checkbox"
              id="return-depTime-0612"
              value={12}
              onChange={handleReturnDepChange}
              checked={returnDepTime.includes(12)}
            />
            <label htmlFor="return-depTime-0612">
              <span />
            </label>
            <p className="time-legend">6시</p>
          </li>
          <li className="time-selection">
            <input
              type="checkbox"
              id="return-depTime-1218"
              value={18}
              onChange={handleReturnDepChange}
              checked={returnDepTime.includes(18)}
            />
            <label htmlFor="return-depTime-1218">
              <span />
            </label>
            <p className="time-legend">12시</p>
          </li>
          <li className="time-selection">
            <input
              type="checkbox"
              id="return-depTime-1824"
              value={24}
              onChange={handleReturnDepChange}
              checked={returnDepTime.includes(24)}
            />
            <label htmlFor="return-depTime-1824">
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

export default ReturnDepTime;
