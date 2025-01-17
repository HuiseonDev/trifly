import "@/app/(default)/(ticket)/ticket-result/Filter.scss";
import { FilterProps, IAllianceChk } from "@/atoms/atoms";
import useAllChecked from "@/hook/useAllChecked";
import { AirlineData, CodeState } from "@/types";
import {
  ChangeEvent,
  Dispatch,
  memo,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const getAirlinesByAlliance = (
  airline: CodeState<AirlineData>,
  carrierCodes: string[],
) => {
  // 동맹체별 항공사 mapping
  const allianceMap: { [key: string]: string[] } = {};

  carrierCodes.forEach((code) => {
    const alliance = airline[code].allianceEng || "others";
    if (!allianceMap[alliance]) {
      allianceMap[alliance] = [];
    }
    allianceMap[alliance].push(code);
  });

  return allianceMap;
};

const AirlineFilter = memo(
  ({
    airline,
    carrierCodes,
    allianceChk,
    selectedAirlines: initialSelectedAirlines,
    handleFilterChange,
  }: {
    airline: CodeState<AirlineData>;
    carrierCodes: string[];
    allianceChk: IAllianceChk[];
    selectedAirlines: string[];
    handleFilterChange: Dispatch<SetStateAction<FilterProps>>;
  }) => {
    const [selectedAirlines, setSelectedAirlines] = useState<string[]>(() => {
      return initialSelectedAirlines.length === 0
        ? carrierCodes
        : initialSelectedAirlines;
    });

    // 불필요한 재계산 방지
    const allianceMap = useRef(getAirlinesByAlliance(airline, carrierCodes));

    /* -------------------------------------------------------------------------- */
    /*                                 항공사 선택                                   */
    /* -------------------------------------------------------------------------- */
    const allianceCont =
      allianceChk.length > 0 && initialSelectedAirlines.length > 0
        ? allianceChk
        : [
            {
              name: "Skyteam",
              title: "스카이팀",
              content: "",
              checked: true,
            },
            {
              name: "Star Alliance",
              title: "스타얼라이언스",
              content: "",
              checked: true,
            },
            {
              name: "oneworld",
              title: "원월드",
              content: "",
              checked: true,
            },
            {
              name: "others",
              title: "기타",
              content: "",
              checked: true,
            },
          ];

    const [allianceCheck, setAllianceCheck] = useState(allianceCont);
    const { setCheck } = useAllChecked(allianceCheck, setAllianceCheck);

    const handleSelectAll = () => {
      // 모든 동맹체를 체크 상태로 변경
      setAllianceCheck((prev) =>
        prev.map((item) => ({ ...item, checked: true })),
      );

      // 모든 항공사 선택
      setSelectedAirlines(carrierCodes);
    };

    const handleUnselectAll = () => {
      // 모든 동맹체를 체크 해제 상태로 변경
      setAllianceCheck((prev) =>
        prev.map((item) => ({ ...item, checked: false })),
      );

      // 모든 항공사 선택 해제
      setSelectedAirlines([]);
    };

    /* -------------------------------------------------------------------------- */
    /*                                  동맹체 체크 여부                              */
    /* -------------------------------------------------------------------------- */
    const handleAllianceChk = (e: ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = e.target;

      // 현재 변경된 동맹체의 항공사들
      const airlinesInAlliance = allianceMap.current[name] || [];

      // 동맹체 체크 상태 업데이트
      setCheck(e);

      // 해당 동맹체의 항공사들만 선택/해제
      setSelectedAirlines((prev) => {
        if (checked) {
          // 체크된 경우: 해당 동맹체의 항공사들을 추가
          return [...prev, ...airlinesInAlliance];
        } else {
          // 해제된 경우: 해당 동맹체의 항공사들만 제거
          return prev.filter((code) => !airlinesInAlliance.includes(code));
        }
      });
    };

    const alliances = allianceCheck.map((item) => (
      <li key={item.title}>
        <input
          type="checkbox"
          name={item.name}
          id={item.name}
          value={item.title}
          checked={item.checked}
          onChange={handleAllianceChk}
        />
        <label htmlFor={item.name}>{item.title}</label>
      </li>
    ));

    const handleAirlineChk = useCallback((e: ChangeEvent<HTMLInputElement>) => {
      const { value, checked } = e.target;
      setSelectedAirlines((prev) => {
        if (checked) {
          return [...prev, value];
        }
        return prev.filter((item) => item !== value);
      });
    }, []);

    // 선택된 항공사가 변경될 때마다 필터 상태 업데이트
    useEffect(() => {
      handleFilterChange((prev) => ({
        ...prev,
        airline: selectedAirlines,
        allianceChk: allianceCheck,
      }));
    }, [selectedAirlines, allianceCheck]);

    const airlines = carrierCodes.map((item) => (
      <li key={item}>
        <input
          type="checkbox"
          id={item}
          value={item}
          checked={selectedAirlines.includes(item)}
          onChange={handleAirlineChk}
        />
        <label htmlFor={item}>{airline[item].nameKor}</label>
      </li>
    ));

    return (
      <div className="filter-contents airlines">
        <ul className="all-check">
          <li>
            <input
              type="checkbox"
              id="allChk"
              name="allChk"
              value="allChk"
              disabled={
                allianceCheck.filter((item) => !item.checked).length < 1
              }
              checked={
                allianceCheck.filter((item) => !item.checked).length >= 1
              }
              onChange={handleSelectAll}
            />
            <label htmlFor="allChk">모두 선택</label>
          </li>
          <li>
            <input
              type="checkbox"
              id="allCancel"
              name="allChk"
              value="allCancel"
              disabled={
                allianceCheck.filter((item) => !item.checked).length >= 1
              }
              checked={allianceCheck.filter((item) => !item.checked).length < 1}
              onChange={handleUnselectAll}
            />
            <label htmlFor="allCancel">모두 해제</label>
          </li>
        </ul>
        <ul className="alliance">{alliances}</ul>
        <ul className="airline">{airlines}</ul>
      </div>
    );
  },
);

export default AirlineFilter;
