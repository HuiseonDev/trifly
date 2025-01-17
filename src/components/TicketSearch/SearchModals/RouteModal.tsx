import { AirportData } from "@/types";
import Image from "next/image";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import ItineraryModal from "./ItineraryModal";
import "./RouteModal.scss";

interface BaseProps {
  type: "origin" | "destination";
  handleClose: Dispatch<SetStateAction<boolean>>;
  airport: AirportData[];
}

interface OriginProps extends BaseProps {
  type: "origin";
  setOrigin: (obj: { code: string; value: string }) => void;
  setDestination?: never;
}

interface DestinationProps extends BaseProps {
  type: "destination";
  setDestination: (obj: { code: string; value: string }) => void;
  setOrigin?: never;
}

type RouteModalProps = OriginProps | DestinationProps;

const RouteModal = ({
  type,
  handleClose,
  airport,
  setOrigin,
  setDestination,
}: RouteModalProps) => {
  const [selectedArea, setSelectedArea] = useState("대한민국");
  const [airportList, setAirportList] = useState<JSX.Element[]>([]);

  const areas = [
    "대한민국",
    "일본",
    "중국/홍콩/대만",
    "동남아시아/서남아시아",
    "미주",
    "유럽",
    "대양주/괌/사이판",
    "중동/아프리카",
    "러시아/몽골/중앙아시아",
    "중남미",
  ];

  const handleAirport = (info: { code: string; value: string }) => {
    if (type === "origin") {
      setOrigin(info);
    } else {
      setDestination(info);
    }

    handleClose(false);
  };

  const renderAirport = (data: AirportData[]): JSX.Element[] => {
    const airports = data.map((item, index) => {
      const info = {
        code: item.code,
        value: item.value,
      };
      return (
        <li className="airport-item" key={index}>
          <button
            type="button"
            className="airport-item-button"
            value={item.code}
            onClick={() => handleAirport(info)}
          >
            <span>{info.code}</span>
            <span>{info.value}</span>
          </button>
        </li>
      );
    });

    return airports;
  };

  useEffect(() => {
    const filteredData = airport.filter(
      (item) => item.areaCode === selectedArea,
    );

    const newAirportList = renderAirport(filteredData);

    setAirportList(newAirportList);
  }, [selectedArea]);

  const handleArea = (
    e:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>,
  ) => {
    const target = e.target as HTMLButtonElement;

    document.querySelectorAll("button").forEach((button) => {
      button.classList.remove("selected");
    });

    target.classList.add("selected");

    setSelectedArea(target.value);
  };

  const areaList = areas.map((area, index) => (
    <li className="area-item" key={index}>
      <button
        type="button"
        className="area-item-button"
        onClick={handleArea}
        value={area}
      >
        {area}
      </button>
    </li>
  ));

  return (
    <ItineraryModal handleClose={handleClose}>
      <div className="route-modal">
        <button
          className="close-button img-box"
          type="button"
          onClick={() => {
            handleClose(false);
          }}
        >
          <Image
            src="/img/icon-close-black.svg"
            alt="닫기"
            width={0}
            height={0}
            sizes="100%"
          />
          <span className="hidden">닫기</span>
        </button>
        <div className="area-section">
          <ul className="area-list">{areaList}</ul>
        </div>
        <div className="airport-section">
          <ul className="airport-list">{airportList}</ul>
        </div>
      </div>
    </ItineraryModal>
  );
};

export default RouteModal;
