/* offers search */
export interface OffersSearch {
  meta: {
    count: number;
    links: {
      self: string;
    };
  };
  data: OffersSearchData[];
  dictionaries: {
    locations: {
      [key: string]: {
        cityCode: string;
        countryCode: string;
      };
    };
    aircraft: {
      [key: string]: string;
    };
    currencies: {
      KRW: "S.KOREAN WON";
    };
    carriers: {
      [key: string]: string;
    };
  };
}

export interface OffersSearchData extends OffersData {
  itineraries: {
    duration: string;
    segments: SegmentsData[];
  }[];
  travelerPricings: [
    {
      travelerId: string;
      fareOption: string;
      travelerType: string;
      price: {
        currency: "KRW";
        total: string;
        base: string;
      };
      fareDetailsBySegment: {
        cabin: "ECONOMY" | "PREMIUM_ECONOMY" | "BUSINESS" | "FIRST";
        segmentId?: string;
        fareBasis: string;
        brandedFare?: string;
        brandedFareLabel?: string;
        class: string;
        includedCheckedBags: {
          weight?: number;
          weightUnit?: "KG";
          quantity?: number;
        };
        includedCabinBags?: {
          weight?: number;
          weightUnit?: "KG";
          quantity?: number;
        };
        amenities?: {
          description: string;
          isChargeable: boolean;
          amenityType: string;
          amenityProvider: {
            name: string;
          };
        }[];
      }[];
    },
  ];
}

/* offers price */
export interface OffersPrice {
  data: {
    type: "flight-offers-pricing";
    flightOffers: OffersPriceData[];
    bookingRequirements: {
      emailAddressRequired: boolean;
      mobilePhoneNumberRequired: boolean;
      travelerRequirements?: {
        travelerId: string;
        genderRequired: boolean;
        documentRequired: boolean;
        dateOfBirthRequired: boolean;
        redressRequiredIfAny: boolean;
        residenceRequired: boolean;
      }[];
    };
  };
  dictionaries: {
    locations: {
      [key: string]: {
        cityCode: string;
        countryCode: string;
      };
    };
  };
}

export interface OffersPriceData extends OffersData {
  itineraries: {
    segments: SegmentsData[];
  }[];
  travelerPricings: TravelerPricing[];
}

export interface TravelerPricing {
  travelerId: string;
  fareOption: string;
  travelerType: "ADULT" | "CHILD" | "INFANT";
  price: {
    currency: "KRW";
    total: string;
    base: string;
    taxes: {
      amount: string;
      code: string;
    }[];
    refundableTaxes: string;
  };
  fareDetailsBySegment: {
    segmentId: string;
    cabin: "ECONOMY" | "PREMIUM_ECONOMY" | "BUSINESS" | "FIRST";
    fareBasis: string;
    brandedFare?: string;
    class: string;
    includedCheckedBags: {
      quantity?: number;
      weight?: number;
      weightUnit?: "KG";
    };
  }[];
}

/* search, price 공통 속성 */
interface OffersData {
  type: "flight-offer";
  id: string;
  source: "GDS";
  instantTicketingRequired?: boolean;
  nonHomogeneous: boolean;
  oneWay?: boolean;
  isUpsellOffer?: false;
  paymentCardRequired?: boolean;
  lastTicketingDate: string;
  lastTicketingDateTime?: string;
  numberOfBookableSeats?: number;
  price: Price;
  pricingOptions: {
    fareType: string[];
    includedCheckedBagsOnly: boolean;
  };
  validatingAirlineCodes: string[];
}

interface Price {
  currency: "KRW";
  total: string;
  base: string;
  fees: {
    amount: string;
    type: string;
  }[];
  grandTotal: string;
  billingCurrency?: "KRW"; // 결제 통화
}

interface SegmentsData extends FlightRouteData {
  duration: string;
  numberOfStops: number;
  co2Emissions?: {
    weight: number;
    weightUnit: "KG";
    cabin: "ECONOMY" | "PREMIUM_ECONOMY" | "BUSINESS" | "FIRST";
  }[];
  blacklistedInEU?: boolean;
}

interface FlightRouteData {
  id: string;
  departure: {
    iataCode: string;
    terminal?: string;
    at: string;
  };
  arrival: {
    iataCode: string;
    terminal?: string;
    at: string;
  };
  carrierCode: string;
  number: string;
  aircraft: {
    code: string;
  };
  operating?: {
    carrierCode: string;
  };
}

/* create-orders */
export interface NewOrderRequest {
  data: NewOrderData;
}

export interface NewOrderData {
  type: "flight-order";
  flightOffers: OffersPriceData[];
  travelers: [
    {
      id: string;
      dateOfBirth: string;
      name: {
        firstName: string;
        lastName: string;
      };
      gender: string;
      contact: {
        purpose?: string;
        emailAddress: string;
        phones: [
          {
            deviceType: string;
            countryCallingCode: string;
            number: string;
          },
        ];
      };
      documents: [
        {
          documentType: string;
          birthPlace: string;
          issuanceLocation: string;
          issuanceDate: string;
          number: string;
          expiryDate: string;
          issuanceCountry: string;
          validityCountry?: string;
          nationality: string;
          holder: boolean;
        },
      ];
    },
  ];
  remarks: {
    general: [
      {
        subType: string;
        text: string;
      },
    ];
  };
  ticketingAgreement: {
    option: string;
    delay: string;
  };
  contacts: [
    {
      addresseeName: {
        firstName: string;
        lastName?: string;
      };
      companyName: string;
      purpose: string;
      phones: {
        deviceType: string;
        countryCallingCode: string;
        number: string;
      }[];
      emailAddress: string;
      address: {
        lines: string[];
        postalCode: string;
        cityName: string;
        countryCode: string;
      };
    },
  ];
  automatedProcess?: {
    code: string;
    queue: {
      number: string;
      category: string;
    };
    officeId: string;
  }[];
}

export interface NewOrderResponse {
  data: NewOrderResponseData;
  dictionaries: {
    locations: {
      [key: string]: {
        cityCode: string;
        countryCode: string;
      };
    };
  };
}

interface NewOrderResponseData extends NewOrderData {
  id: string;
  queuingOfficeId: string;
  associatedRecords: [
    {
      reference: string;
      creationDate: string;
      originSystemCode: "GDS";
      flightOfferId: string;
    },
  ];
}

/* seat map */
export interface SeatMap {
  meta: {
    count: number;
    links: {
      self: string;
    };
  };
  data: SeatMapData[];
  dictionaries: {
    locations: {
      [key: string]: {
        cityCode: string;
        countryCode: string;
      };
    };
    facilities: {
      [key: string]: string;
    };
    seatCharacteristics: {
      [key: string]: string;
    };
  };
}

export interface SeatMapData extends FlightRouteData {
  type: "seatmap";
  class: string;
  flightOfferId: string;
  segmentId: string;
  decks: {
    deckType: string;
    deckConfiguration: {
      width: number;
      length: number;
      startSeatRow: number;
      endSeatRow: number;
      startWingsX: number;
      endWingsX: number;
      startWingsRow: number;
      endWingsRow: number;
      exitRowsX: number[];
    };
    facilities: SeatFacilities[];
    seats: SeatData[];
  }[];
  aircraftCabinAmenities: {
    power: {
      isChargeable: boolean;
      powerType: string;
      usbType: string;
    };
    seat: {
      legSpace: number;
      spaceUnit: string;
      tilt: string;
      medias: {
        title: string;
        href: string;
        description: {
          text: string;
          lang: string;
        };
        mediaType: string;
      }[];
    };
    wifi: {
      isChargeable: boolean;
      wifiCoverage: string;
    };
    entertainment: {
      isChargeable: boolean;
      entertainmentType: string;
    }[];
    food: {
      isChargeable: boolean;
      foodType: string;
    };
    beverage: {
      isChargeable: boolean;
      beverageType: string;
    };
  };
  availableSeatsCounters: {
    travelerId: string;
    value: number;
  }[];
}

export interface SeatData {
  cabin: "ECONOMY" | "PREMIUM_ECONOMY" | "BUSINESS" | "FIRST";
  number: string;
  characteristicsCodes: string[];
  travelerPricing: SeattravelerPricing[];
  coordinates: {
    x: number;
    y: number;
  };
}

export interface SeattravelerPricing {
  travelerId: string;
  seatAvailabilityStatus: "BLOCKED" | "AVAILABLE" | "OCCUPIED";
  price?: {
    currency: string;
    total: string;
    base: string;
    taxes: {
      amount: string;
      code: string;
    }[];
  };
}

export interface SeatFacilities {
  code: string;
  column: string;
  row?: string;
  position: string;
  coordinates: {
    x: number;
    y: number;
  };
}
