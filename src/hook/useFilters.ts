import { FilterProps } from "@/atoms/atoms";
import convertToMinutes from "@/lib/convertToMin";
import { OffersSearchData } from "@/types";
import { useMemo } from "react";

const useFilters = (
  data: OffersSearchData[],
  filters: FilterProps,
  prices: number[],
  returnDate?: string,
) => {
  return useMemo(() => {
    let filteredData = [...data];

    if (filters.nonStop) {
      filteredData = filteredData.filter((offer) =>
        offer.itineraries.every((itinerary) => itinerary.segments.length === 1),
      );
    }

    if (filters.originDepTime) {
      const { originDepTime } = filters;

      filteredData = filteredData.filter((offer) => {
        const departureTime = new Date(
          offer.itineraries[0].segments[0].departure.at,
        ).getHours();

        return originDepTime.some(
          (timeRange) =>
            departureTime >= timeRange - 6 && departureTime < timeRange,
        );
      });
    }

    if (filters.originArrTime) {
      const { originArrTime } = filters;

      filteredData = filteredData.filter((offer) => {
        const segmentsLength = offer.itineraries[0].segments.length;
        const arrTime = new Date(
          offer.itineraries[0].segments[segmentsLength - 1].arrival.at,
        ).getHours();

        return originArrTime.some(
          (timeRange) => arrTime >= timeRange - 6 && arrTime < timeRange,
        );
      });
    }

    if (returnDate) {
      if (filters.returnDepTime) {
        const { returnDepTime } = filters;

        filteredData = filteredData.filter((offer) => {
          const departureTime = new Date(
            offer.itineraries[1].segments[0].departure.at,
          ).getHours();

          return returnDepTime.some(
            (timeRange) =>
              departureTime >= timeRange - 6 && departureTime < timeRange,
          );
        });
      }

      if (filters.returnArrTime) {
        const { returnArrTime } = filters;

        filteredData = filteredData.filter((offer) => {
          const segmentsLength = offer.itineraries[1].segments.length;
          const arrTime = new Date(
            offer.itineraries[1].segments[segmentsLength - 1].arrival.at,
          ).getHours();

          return returnArrTime.some(
            (timeRange) => arrTime >= timeRange - 6 && arrTime < timeRange,
          );
        });
      }
    }

    if (filters.airline) {
      const airlines = filters.airline;
      filteredData = filteredData.filter((offer) =>
        offer.itineraries.every((itinerary) =>
          itinerary.segments.every((segment) =>
            airlines.includes(segment.carrierCode),
          ),
        ),
      );
    }

    if (filters.maxPrice) {
      const { maxPrice } = filters;

      if (filters.maxPrice < Math.max(...prices)) {
        filteredData = filteredData.filter(
          (offer) => Number(offer.price.grandTotal) <= maxPrice,
        );
      }
    }

    if (filters.sortBy) {
      switch (filters.sortBy) {
        case "priceLow":
          filteredData.sort(
            (a, b) => Number(a.price.grandTotal) - Number(b.price.grandTotal),
          );
          break;
        case "durationShort":
          filteredData.sort((a, b) => {
            const durationA = a.itineraries.reduce(
              (acc, itinerary) =>
                acc +
                itinerary.segments.reduce(
                  (segAcc, segment) =>
                    segAcc + convertToMinutes(segment.duration),
                  0,
                ),
              0,
            );

            const durationB = b.itineraries.reduce(
              (acc, itinerary) =>
                acc +
                itinerary.segments.reduce(
                  (segAcc, segment) =>
                    segAcc + convertToMinutes(segment.duration),
                  0,
                ),
              0,
            );

            if (durationA !== durationB) {
              return durationA - durationB;
            }

            const priceA = Number(a.price.grandTotal);
            const priceB = Number(b.price.grandTotal);

            return priceA - priceB;
          });
          break;
        case "depDepTime":
          filteredData.sort((a, b) => {
            const depTimeA = new Date(
              a.itineraries[0].segments[0].departure.at,
            ).getTime();
            const depTimeB = new Date(
              b.itineraries[0].segments[0].departure.at,
            ).getTime();

            if (depTimeA !== depTimeB) {
              return depTimeA - depTimeB;
            }

            const priceA = Number(a.price.grandTotal);
            const priceB = Number(b.price.grandTotal);

            return priceA - priceB;
          });
          break;
        case "returnDepTime":
          filteredData.sort((a, b) => {
            const depTimeA = new Date(
              a.itineraries[1].segments[0].departure.at,
            ).getTime();
            const depTimeB = new Date(
              b.itineraries[1].segments[0].departure.at,
            ).getTime();

            if (depTimeA !== depTimeB) {
              return depTimeA - depTimeB;
            }

            const priceA = Number(a.price.grandTotal);
            const priceB = Number(b.price.grandTotal);

            return priceA - priceB;
          });
          break;
        case "depArrTime":
          filteredData.sort((a, b) => {
            const stopA = a.itineraries[0].segments.length;
            const stopB = b.itineraries[0].segments.length;

            const arrTimeA = new Date(
              a.itineraries[0].segments[stopA - 1].arrival.at,
            ).getTime();
            const arrTimeB = new Date(
              b.itineraries[0].segments[stopB - 1].arrival.at,
            ).getTime();

            if (arrTimeA !== arrTimeB) {
              return arrTimeA - arrTimeB;
            }

            const priceA = Number(a.price.grandTotal);
            const priceB = Number(b.price.grandTotal);

            return priceA - priceB;
          });
          break;
        case "returnArrTime":
          filteredData.sort((a, b) => {
            const stopA = a.itineraries[1].segments.length;
            const stopB = b.itineraries[1].segments.length;

            const arrTimeA = new Date(
              a.itineraries[1].segments[stopA - 1].arrival.at,
            ).getTime();
            const arrTimeB = new Date(
              b.itineraries[1].segments[stopB - 1].arrival.at,
            ).getTime();

            if (arrTimeA !== arrTimeB) {
              return arrTimeA - arrTimeB;
            }

            const priceA = Number(a.price.grandTotal);
            const priceB = Number(b.price.grandTotal);

            return priceA - priceB;
          });
          break;
        default:
          filteredData.sort(
            (a, b) => Number(a.price.grandTotal) - Number(b.price.grandTotal),
          );
          break;
      }
    }

    return filteredData;
  }, [data, filters, prices, returnDate]);
};

export default useFilters;
