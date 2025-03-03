"use client";

import { OrderData } from "@/types";
import { atom, RecoilEnv } from "recoil";
import { recoilPersist } from "recoil-persist";

RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

interface ModalProps {
  isOpen: boolean;
  closeButton?: boolean;
  title?: string;
  content?: React.ReactNode;
  buttonNum?: 0 | 1 | 2;
  handleConfirm?: () => void;
  handleCancel?: () => void;
}

export interface IAllianceChk {
  name: string;
  title: string;
  content: string;
  checked: boolean;
}

export interface FilterProps {
  nonStop: boolean;
  originDepTime: number[];
  originArrTime: number[];
  returnDepTime: number[];
  returnArrTime: number[];
  allianceChk: IAllianceChk[];
  airline: string[];
  maxPrice: number;
  sortBy: string;
}

export interface OrderProps
  extends Pick<OrderData, "totalPrice" | "itineraries" | "price"> {
  departureDate: string;
  returnDate: string;
}

interface DateProps {
  departureDate: string;
  returnDate?: string;
}

export interface SearchResultProps {
  tripType: string;
  nonStop: boolean;
  origin: {
    code: string;
    value: string;
  };
  destination: {
    code: string;
    value: string;
  };
  schedule: {
    departureDate: string;
    departureFormattedDate: string;
    returnDate: string;
    returnFormattedDate: string;
  };
  passengers: {
    adults: number;
    children: number;
    infants: number;
  };
  cabin: {
    cabin: string;
    cabinKor: string;
  };
}

const sessionStorage =
  typeof window !== "undefined" ? window.sessionStorage : undefined;

const localStorage =
  typeof window !== "undefined" ? window.localStorage : undefined;

export const modalState = atom<ModalProps>({
  key: "modalState",
  default: {
    isOpen: false,
    closeButton: true,
    title: "",
    content: null,
    buttonNum: 1,
    handleConfirm: () => {},
    handleCancel: () => {},
  },
});

export const dateState = atom<DateProps>({
  key: "dateState",
  default: {
    departureDate: "",
    returnDate: "",
  },
});

const { persistAtom: sessionPersistAtom } = recoilPersist({
  key: "sessionGlobalState",
  storage: sessionStorage,
});

const { persistAtom: localPersistAtom } = recoilPersist({
  key: "localGlobalState",
  storage: localStorage,
});

export const defaultSearchResult = {
  tripType: "round",
  nonStop: false,
  origin: {
    code: "SEL",
    value: "서울",
  },
  destination: {
    code: "",
    value: "",
  },
  schedule: {
    departureDate: "",
    departureFormattedDate: "",
    returnDate: "",
    returnFormattedDate: "",
  },
  passengers: {
    adults: 1,
    children: 0,
    infants: 0,
  },
  cabin: {
    cabin: "",
    cabinKor: "모든 클래스",
  },
};

export const searchResultState = atom<SearchResultProps>({
  key: "searchResultState",
  default: defaultSearchResult,
  effects_UNSTABLE: [sessionPersistAtom],
});

export const recentSearchState = atom<SearchResultProps[]>({
  key: "recentSearchState",
  default: [],
  effects_UNSTABLE: [localPersistAtom],
});

export const defaultFilterState: FilterProps = {
  nonStop: false,
  originDepTime: [6, 12, 18, 24],
  originArrTime: [6, 12, 18, 24],
  returnDepTime: [6, 12, 18, 24],
  returnArrTime: [6, 12, 18, 24],
  allianceChk: [],
  airline: [],
  maxPrice: 0,
  sortBy: "priceLow",
};

export const filterState = atom<FilterProps>({
  key: "filterState",
  default: defaultFilterState,
  effects_UNSTABLE: [sessionPersistAtom],
});

export const orderState = atom<OrderProps>({
  key: "orderState",
  effects_UNSTABLE: [sessionPersistAtom],
});

export const savedEmailState = atom<{
  isEmailSaved: boolean;
  savedEamil: string;
}>({
  key: "savedEmailState",
  default: { isEmailSaved: false, savedEamil: "" },
  effects_UNSTABLE: [localPersistAtom],
});

export const loginTypeState = atom({
  key: "loginTypeState",
  default: "email",
  effects_UNSTABLE: [localPersistAtom],
});

export const userTestVisitedState = atom({
  key: "userTestVisitedState",
  default: ["홈"],
  effects_UNSTABLE: [localPersistAtom],
});
