"use client";

import { modalState, orderState, searchResultState } from "@/atoms/atoms";
import Badge from "@/components/Badge/Badge";
import flightPriceAction from "@/data/actions/flightPriceAction";
import { AirlineData, CodeState, OffersSearchData } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRecoilValue, useSetRecoilState } from "recoil";
import "./TicketResultItem.scss";
import Loading from "@/components/Loading/Loading";

const TicketResultItem = ({
  user,
  item,
  airline,
  isLast,
}: {
  user: boolean;
  item: OffersSearchData;
  airline: CodeState<AirlineData>;
  isLast: boolean;
}) => {
  const { itineraries } = item;
  const searchResult = useRecoilValue(searchResultState);
  const setOrderState = useSetRecoilState(orderState);
  const setModal = useSetRecoilState(modalState);
  const router = useRouter();

  const fetchPrice = async (data: OffersSearchData) => {
    const flightPrice = await flightPriceAction(data);

    return flightPrice;
  };

  /* -------------------------------------------------------------------------- */
  /*                              PT6H10 -> 6시간 10분                            */
  /* -------------------------------------------------------------------------- */
  function parseDuration(duration: string) {
    const regex = /PT(\d+H)?(\d+M)?/;
    const matches = duration.match(regex);

    let hours: number = 0;
    let minutes: number = 0;

    if (matches) {
      hours = matches[1] ? parseInt(matches[1], 10) : 0;
      minutes = matches[2] ? parseInt(matches[2], 10) : 0;
    }

    return hours * 60 + minutes;
  }

  function parseDurationFormat(duration: string) {
    const regex = /PT(\d+H)?(\d+M)?/;
    const matches = duration.match(regex);

    let hours: string = "";
    let minutes: string = "";

    if (matches) {
      hours = matches[1] ? matches[1].replace("H", "") : "0";
      minutes = matches[2] ? matches[2].replace("M", "") : "0";
    }

    return `${hours}시간 ${Number(minutes) > 0 ? `${minutes}분` : ""}`;
  }

  /* -------------------------------------------------------------------------- */
  /*                        2024-08-23T16:45:00 -> 16:45                        */
  /* -------------------------------------------------------------------------- */
  function formatTime(isoString: string) {
    const date = new Date(isoString);

    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  }

  /* -------------------------------------------------------------------------- */
  /*                                  대기 시간 계산                               */
  /* -------------------------------------------------------------------------- */
  function calculateWaitingTime(
    totalDuration: string,
    ...segmentDurations: string[]
  ) {
    const totalMinutes = parseDuration(totalDuration);
    const totalSegmentMinutes = segmentDurations.reduce(
      (acc: number, duration: string) => acc + parseDuration(duration),
      0,
    );

    const waitingMinutes = totalMinutes - totalSegmentMinutes;

    // 시간 환산
    const waitingHours = Math.floor(waitingMinutes / 60);
    const waitingMins = waitingMinutes % 60;

    return `${Number(waitingHours) > 0 ? `${waitingHours}시간` : ""}  ${Number(waitingMins) > 0 ? `${waitingMins}분` : ""}`;
  }

  /* -------------------------------------------------------------------------- */
  /*                                  날짜 차이 계산                               */
  /* -------------------------------------------------------------------------- */
  function calculateDayDifference(departureTime: string, arrivalTime: string) {
    const departureDate = new Date(departureTime);
    const arrivalDate = new Date(arrivalTime);
    const startOfDepartureDay = new Date(departureDate);
    startOfDepartureDay.setHours(0, 0, 0, 0);

    const startOfArrivalDay = new Date(arrivalDate);
    startOfArrivalDay.setHours(0, 0, 0, 0);

    // 출발일과 도착일 간의 날짜 차이를 계산
    const dayDifference = Math.ceil(
      (startOfArrivalDay.getTime() - startOfDepartureDay.getTime()) /
        (1000 * 60 * 60 * 24),
    );

    return dayDifference > 0 ? dayDifference : 0;
  }

  const routeList = itineraries.map((itinerary, index) => {
    const stopTime = itinerary.segments.length - 1;
    const totalTime = itinerary.duration;
    const flightTime: string[] = [];
    itinerary.segments.forEach((segment) => {
      flightTime.push(segment.duration);
    });
    const waitingTime = calculateWaitingTime(totalTime, ...flightTime);
    const dayDifference = calculateDayDifference(
      itinerary.segments[0].departure.at,
      itinerary.segments[stopTime].arrival.at,
    );

    const airlines: string[] = [];
    itinerary.segments.forEach((segment) => {
      airlines.push(segment.carrierCode);
    });

    const airlinesSet = [...new Set(airlines)];

    return (
      <div key={index} className="route">
        <div className="airline-info">
          <div className="airline">
            <div className="airline-logo img-box">
              <Image
                src={`https://flights.myrealtrip.com/air/wfw/imgs/mbl/logo/air/${itinerary.segments[0].carrierCode}.png`}
                alt={
                  airline[itinerary.segments[0].carrierCode]
                    ? airline[itinerary.segments[0].carrierCode].nameKor
                    : itinerary.segments[0].carrierCode
                }
                width={0}
                height={0}
                sizes="100%"
              />
            </div>
            <div className="airline-title">
              <p className="main-airline">
                {airline[itinerary.segments[0].carrierCode].nameKor}
              </p>
              {itinerary.segments[0].operating &&
                itinerary.segments[0].operating.carrierCode !==
                  itinerary.segments[0].carrierCode && (
                  <p className="codeshare-airline">
                    {`공동운항 ${
                      airline[itinerary.segments[0].operating.carrierCode]
                        ? airline[itinerary.segments[0].operating.carrierCode]
                            .nameKor
                        : "항공사 확인"
                    } `}
                  </p>
                )}
            </div>
          </div>
          {airlinesSet.length > 1 && (
            <div className="transfer-option">
              <Badge>타 항공사 환승 포함</Badge>
            </div>
          )}
        </div>
        <div className="route-info">
          <div className="airport">
            <div className="time">
              <p className="time-detail">
                {formatTime(itinerary.segments[0].departure.at)}
              </p>
              <p className="airport-code">
                {itinerary.segments[0].departure.iataCode}
              </p>
            </div>
          </div>
          <div className="to">
            <div className="from-to">
              <div className="arrow" />
              <p className="duration">
                {parseDurationFormat(itinerary.duration)}
                {stopTime >= 1 && (
                  <span>
                    <Badge type="gray">{`경유 ${stopTime}`}</Badge>
                  </span>
                )}
              </p>
            </div>
          </div>
          <div className="airport">
            <div className="time">
              <p className="time-detail">
                {formatTime(itinerary.segments[stopTime].arrival.at)}
              </p>
              <p className="airport-code">
                {itinerary.segments[stopTime].arrival.iataCode}
              </p>
            </div>
            <div
              className={`day-difference ${dayDifference > 0 ? "is-active" : "disabled"}`}
            >
              <Badge type="secondary">{`+${dayDifference}`}</Badge>
            </div>
          </div>
        </div>
        <div className="way-type">
          <p className="stop-number">
            {stopTime >= 1 ? `${stopTime}번 경유` : "직항"}
          </p>
          {stopTime >= 1 && <p className="stop-time">대기시간 {waitingTime}</p>}
        </div>
      </div>
    );
  });

  const handleClick = async () => {
    const flightOffers = item;
    const totalPrice: string = item.price.total;
    const departureDate: string = searchResult.schedule.departureFormattedDate;
    const returnDate: string = searchResult.schedule.returnFormattedDate;

    if (user) {
      setModal({
        isOpen: true,
        closeButton: false,
        title: "항공편 조회",
        content: (
          <>
            선택하신 항공편을 조회 중입니다.
            <Loading type="small" />
          </>
        ),
        buttonNum: 0,
        handleConfirm: () => {},
        handleCancel: () => {},
      });

      try {
        const price = await fetchPrice(flightOffers);

        setOrderState({
          departureDate,
          returnDate,
          totalPrice,
          itineraries,
          price,
        });

        router.push("/order/agree");
      } catch (error) {
        console.error("항공편 조회 중 오류가 발생했습니다.", error);
      } finally {
        setModal({ isOpen: false }); // 모달 닫기
      }
    } else {
      setModal({
        isOpen: true,
        title: "로그인 필요",
        content:
          "항공권을 구매하려면 로그인이 필요합니다.\n로그인 페이지로 이동하시겠습니까?",
        buttonNum: 2,
        handleConfirm: () => {
          router.push("/login");
        },
        handleCancel: () => {},
      });
    }
  };

  return (
    <button
      className={`ticket-item ${isLast ? "isLast" : ""}`}
      onClick={handleClick}
    >
      <div className="ticket-itinerary">{routeList}</div>
      <div className="ticket-pricing">
        <p className="remaining-seats">{item.numberOfBookableSeats}석 남음</p>
        <div className="price-per-adults">
          <p className="price">
            <span>
              {Number(
                item.travelerPricings[0].price.total.split(".")[0],
              ).toLocaleString()}
            </span>
            원
          </p>
          <p className="price-info">유류할증료 및 세금 포함</p>
        </div>
      </div>
    </button>
  );
};

export default TicketResultItem;
