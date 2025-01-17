"use client";

import {
  defaultFilterState,
  filterState,
  modalState,
  recentSearchState,
  searchResultState,
} from "@/atoms/atoms";
import Badge from "@/components/Badge/Badge";
import Button from "@/components/Button/Button";
import RouteModal from "@/components/TicketSearch/SearchModals/RouteModal";
import { AirportData, CodeState } from "@/types";
import Image from "next/image";
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import PassengersModal from "./SearchModals/PassengersModal";
import ScheduleModal from "./SearchModals/ScheduleModal";
import "./TicketSearch.scss";

const TicketSearchBox = ({
  code,
  airport,
  handleChange,
}: {
  code: CodeState<AirportData>;
  airport: AirportData[];
  handleChange?: () => void;
}) => {
  const [recentSearch, setRecentSearch] = useRecoilState(recentSearchState);
  const [searchResult, setSearchResult] = useRecoilState(searchResultState);
  const setFilterState = useSetRecoilState(filterState);
  const [tripType, setTripType] = useState("round");
  const [nonStop, setNonStop] = useState(false);
  const [origin, setOrigin] = useState({
    code: "SEL",
    value: "서울",
  });
  const [destination, setDestination] = useState({
    code: "",
    value: "",
  });
  const [originModal, setOriginModal] = useState(false);
  const [destinationModal, setDestinationModal] = useState(false);
  const [schedule, setSchedule] = useState({
    departureDate: "",
    departureFormattedDate: "",
    returnDate: "",
    returnFormattedDate: "",
  });
  const [scheduleModal, setScheduleModal] = useState(false);
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infants: 0,
  });
  const [cabin, setCabin] = useState({
    cabin: "",
    cabinKor: "모든 클래스",
  });
  const [passengersModal, setPassengersModal] = useState(false);
  const setModal = useSetRecoilState(modalState);

  useEffect(() => {
    if (searchResult) {
      setTripType(searchResult.tripType);
      setNonStop(searchResult.nonStop);
      setOrigin({
        code: searchResult.origin.code,
        value: searchResult.origin.value,
      });
      setDestination({
        code: searchResult.destination.code,
        value: searchResult.destination.value,
      });
      setSchedule({
        departureDate: searchResult.schedule.departureDate,
        departureFormattedDate: searchResult.schedule.departureFormattedDate,
        returnDate: searchResult.schedule.returnDate,
        returnFormattedDate: searchResult.schedule.returnFormattedDate,
      });
      setPassengers({
        adults: searchResult.passengers.adults,
        children: searchResult.passengers.children,
        infants: searchResult.passengers.infants,
      });
      setCabin({
        cabin: searchResult.cabin.cabin,
        cabinKor: searchResult.cabin.cabinKor,
      });
    }
  }, []);

  const handleTripType = (e: ChangeEvent<HTMLInputElement>) => {
    setTripType(e.target.value);
    setSchedule({
      departureDate: "",
      departureFormattedDate: "",
      returnDate: "",
      returnFormattedDate: "",
    });
  };

  const handleNonStop = () => {
    setNonStop(!nonStop);
  };

  const handleOrigin = () => {
    setOriginModal(true);
    if (destinationModal) {
      setDestinationModal(false);
    } else if (scheduleModal) {
      setScheduleModal(false);
    } else if (passengersModal) {
      setPassengersModal(false);
    }
  };

  const handleDestination = () => {
    setDestinationModal(true);
    if (originModal) {
      setOriginModal(false);
    } else if (scheduleModal) {
      setScheduleModal(false);
    } else if (passengersModal) {
      setPassengersModal(false);
    }
  };

  const handleItinerary = () => {
    setScheduleModal(true);
    if (originModal) {
      setOriginModal(false);
    } else if (destinationModal) {
      setDestinationModal(false);
    } else if (passengersModal) {
      setPassengersModal(false);
    }
  };

  const handlePassengers = () => {
    setPassengersModal(true);
    if (originModal) {
      setOriginModal(false);
    } else if (destinationModal) {
      setDestinationModal(false);
    } else if (scheduleModal) {
      setScheduleModal(false);
    }
  };

  const handleSwitch = useCallback(() => {
    if (destination.code) {
      setOrigin({
        code: destination.code,
        value: destination.value,
      });

      setDestination({
        code: origin.code,
        value: origin.value,
      });
    }
  }, [origin, destination]);

  const handleClick = () => {
    if (!origin.code) {
      setModal({
        isOpen: true,
        title: "안내",
        content: "출발 공항이 선택되지 않았습니다.\n출발 공항을 선택하세요!",
        buttonNum: 1,
        handleConfirm: () => {},
      });
      return;
    }

    if (!destination.code) {
      setModal({
        isOpen: true,
        title: "안내",
        content: "도착 공항이 선택되지 않았습니다.\n도착 공항을 선택하세요!",
        buttonNum: 1,
        handleConfirm: () => {},
      });
      return;
    }

    if (!schedule.departureDate) {
      setModal({
        isOpen: true,
        title: "안내",
        content: "여행 일정이 선택되지 않았습니다.\n여행 일정을 선택하세요!",
        buttonNum: 1,
        handleConfirm: () => {},
      });
      return;
    }

    const originAirport = code[origin.code] as AirportData;
    const destinationAirport = code[destination.code] as AirportData;

    if (originAirport.cityCode === destinationAirport.cityCode) {
      setModal({
        isOpen: true,
        title: "안내",
        content: "같은 도시로 여행할 수 없습니다!\n공항을 다시 선택하세요!",
        buttonNum: 1,
        handleConfirm: () => {},
      });
      return;
    }

    if (typeof window !== "undefined") {
      window.location.href = `/ticket-result?originLocationCode=${origin.code}&destinationLocationCode=${destination.code}&departureDate=${schedule.departureDate}${tripType === "round" ? `&returnDate=${schedule.returnDate}` : ""}&adults=${passengers.adults}${passengers.children > 0 ? `&children=${passengers.children}` : ""}${passengers.infants > 0 ? `&infants=${passengers.infants}` : ""}${nonStop ? `&nonStop=${nonStop}` : ""}${cabin.cabin ? `&travelClass=${cabin.cabin}` : ""}&currencyCode=KRW`;
    }

    // router.push(
    //   `/ticket-result?originLocationCode=${origin.code}&destinationLocationCode=${destination.code}&departureDate=${schedule.departureDate}${tripType === "round" ? `&returnDate=${schedule.returnDate}` : ""}&adults=${passengers.adults}${passengers.children > 0 ? `&children=${passengers.children}` : ""}${passengers.infants > 0 ? `&infants=${passengers.infants}` : ""}${nonStop ? `&nonStop=${nonStop}` : ""}${cabin.cabin && `&travelClass=${cabin.cabin}`}&currencyCode=KRW`,
    // );

    if (handleChange) {
      handleChange();
    }

    /* -------------------------------------------------------------------------- */
    /*                             검색정보로 넘겨줄 날짜 형식 저장                       */
    /* -------------------------------------------------------------------------- */
    setSearchResult({
      tripType,
      nonStop,
      origin,
      destination,
      schedule,
      passengers,
      cabin,
    });

    setFilterState({ ...defaultFilterState, nonStop });

    const duplicateIndex = recentSearch.findIndex((item) => {
      return (
        tripType === item.tripType &&
        JSON.stringify(nonStop) === JSON.stringify(item.nonStop) &&
        JSON.stringify(origin) === JSON.stringify(item.origin) &&
        JSON.stringify(destination) === JSON.stringify(item.destination) &&
        JSON.stringify(schedule) === JSON.stringify(item.schedule) &&
        JSON.stringify(passengers) === JSON.stringify(item.passengers) &&
        JSON.stringify(cabin) === JSON.stringify(item.cabin)
      );
    });

    if (duplicateIndex !== -1) {
      const newRecentSearch = [...recentSearch];
      const [duplicateSearch] = newRecentSearch.splice(duplicateIndex, 1); // 중복된 항목 제거
      setRecentSearch([duplicateSearch, ...newRecentSearch]);
    } else {
      if (recentSearch.length < 3) {
        setRecentSearch([
          {
            tripType,
            nonStop,
            origin,
            destination,
            schedule,
            passengers,
            cabin,
          },
          ...recentSearch,
        ]);
      } else {
        const newRecentSearch = [...recentSearch];
        newRecentSearch.pop();
        setRecentSearch([
          {
            tripType,
            nonStop,
            origin,
            destination,
            schedule,
            passengers,
            cabin,
          },
          ...newRecentSearch,
        ]);
      }
    }
  };

  const originText = useMemo(
    () => (origin.code ? `${origin.value} (${origin.code})` : "공항 선택"),
    [origin],
  );

  const destinationText = useMemo(
    () =>
      destination.code
        ? `${destination.value} (${destination.code})`
        : "공항 선택",
    [destination],
  );

  const scheduleText = useMemo(() => {
    if (!schedule.departureDate) return "여행 일정 선택";
    return tripType === "round"
      ? `${schedule.departureFormattedDate} ~ ${schedule.returnFormattedDate}`
      : `${schedule.departureFormattedDate}`;
  }, [schedule, tripType]);

  const passengerText = useMemo(() => {
    return `성인 ${passengers.adults}명${passengers.children ? `, 소아 ${passengers.children}명` : ""}${passengers.infants ? `, 유아 ${passengers.infants}명` : ""}, ${cabin.cabinKor}`;
  }, [passengers, cabin]);

  return (
    <div className="search-layout">
      <div className="search-wrapper">
        <div className="search-header">
          <div className="trip-type">
            <input
              type="radio"
              id="round"
              name="tripType"
              value="round"
              checked={tripType === "round"}
              onChange={handleTripType}
            />
            <label htmlFor="round">
              <Badge selected={tripType === "round"}>왕복</Badge>
            </label>
          </div>
          <div className="trip-type">
            <input
              type="radio"
              id="oneway"
              name="tripType"
              value="oneway"
              checked={tripType === "oneway"}
              onChange={handleTripType}
            />
            <label htmlFor="oneway">
              <Badge selected={tripType === "oneway"}>편도</Badge>
            </label>
          </div>
          <div className="non-stop">
            <input
              type="checkbox"
              id="nonstop"
              checked={nonStop}
              onChange={handleNonStop}
            />
            <label htmlFor="nonstop">직항만 검색</label>
          </div>
        </div>
        <div className="search-main">
          <div className="route large">
            <button
              type="button"
              className={`schedule-button origin ${originModal ? "selected" : ""}`}
              onClick={handleOrigin}
            >
              <span className="schedule-title">출발</span>
              <span
                className={`schedule-contents ${origin.code ? "selected" : ""}`}
              >
                {originText}
              </span>
            </button>
            <button
              type="button"
              className={`route-switch ${destination.code ? "is-active" : "disabled"} img-box`}
              onClick={handleSwitch}
            >
              <Image
                src="/img/icon-switch.svg"
                alt="출/도착 변경"
                width={0}
                height={0}
                sizes="100%"
              />
              <span className="hidden">출/도착 변경</span>
            </button>
            <button
              type="button"
              className={`schedule-button ${destinationModal ? "selected" : ""}`}
              onClick={handleDestination}
            >
              <span className="schedule-title">도착</span>
              <span
                className={`schedule-contents ${destination.code ? "selected" : ""}`}
              >
                {destinationText}
              </span>
            </button>
          </div>
          <div className="itinerary small">
            <button
              type="button"
              className={`schedule-button ${scheduleModal ? "selected" : ""}`}
              onClick={handleItinerary}
            >
              {tripType === "round" ? (
                <span className="schedule-title">출발일 - 도착일</span>
              ) : (
                <span className="schedule-title">출발일</span>
              )}

              <span
                className={`schedule-contents ${schedule.departureDate ? "selected" : ""}`}
              >
                {scheduleText}
              </span>
            </button>
          </div>
          <div className="passenger small">
            <button
              type="button"
              className={`schedule-button passenger ${passengersModal ? "selected" : ""}`}
              onClick={handlePassengers}
            >
              <span className="schedule-title">인원, 좌석 등급</span>
              <span
                className={`schedule-contents ${passengers.adults && cabin ? "selected" : ""}`}
              >
                {passengerText}
              </span>
            </button>
          </div>
          <div className="search-button">
            <Button size="sm" onClick={handleClick}>
              검색
            </Button>
          </div>
        </div>
        {originModal && (
          <div className="search-modal">
            <RouteModal
              type="origin"
              handleClose={setOriginModal}
              airport={airport}
              setOrigin={setOrigin}
            />
          </div>
        )}
        {destinationModal && (
          <div className="search-modal">
            <RouteModal
              type="destination"
              handleClose={setDestinationModal}
              airport={airport}
              setDestination={setDestination}
            />
          </div>
        )}
        {scheduleModal && (
          <div className="search-modal">
            <ScheduleModal
              handleClose={setScheduleModal}
              tripType={tripType}
              schedule={schedule}
              setSchedule={setSchedule}
            />
          </div>
        )}
        {passengersModal && (
          <div className="search-modal">
            <PassengersModal
              handleClose={setPassengersModal}
              passengers={passengers}
              setPassengers={setPassengers}
              cabin={cabin}
              setCabin={setCabin}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default TicketSearchBox;
