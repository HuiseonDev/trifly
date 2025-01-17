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

const OriginDepTime = memo(
  ({
    originDepTime: initialOriginDepTime,
    handleFilterChange,
  }: {
    originDepTime: number[];
    handleFilterChange: Dispatch<SetStateAction<FilterProps>>;
  }) => {
    const [originDepTime, setOriginDepTime] =
      useState<number[]>(initialOriginDepTime);

    /* -------------------------------------------------------------------------- */
    /*                             출도착 시간 변경 처리                               */
    /* -------------------------------------------------------------------------- */
    useEffect(() => {
      handleFilterChange((prev) => ({ ...prev, originDepTime }));
    }, [originDepTime]);

    const handleOriginDepChange = (e: ChangeEvent<HTMLInputElement>) => {
      const value = Number(e.target.value);

      setOriginDepTime((prev) => {
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
              id="origin-depTime-0006"
              value={6}
              onChange={handleOriginDepChange}
              checked={originDepTime.includes(6)}
            />
            <label htmlFor="origin-depTime-0006">
              <span />
            </label>
            <p className="time-legend first">0시</p>
          </li>
          <li className="time-selection">
            <input
              type="checkbox"
              id="origin-depTime-0612"
              value={12}
              onChange={handleOriginDepChange}
              checked={originDepTime.includes(12)}
            />
            <label htmlFor="origin-depTime-0612">
              <span />
            </label>
            <p className="time-legend">6시</p>
          </li>
          <li className="time-selection">
            <input
              type="checkbox"
              id="origin-depTime-1218"
              value={18}
              onChange={handleOriginDepChange}
              checked={originDepTime.includes(18)}
            />
            <label htmlFor="origin-depTime-1218">
              <span />
            </label>
            <p className="time-legend">12시</p>
          </li>
          <li className="time-selection">
            <input
              type="checkbox"
              id="origin-depTime-1824"
              value={24}
              onChange={handleOriginDepChange}
              checked={originDepTime.includes(24)}
            />
            <label htmlFor="origin-depTime-1824">
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

export default OriginDepTime;
