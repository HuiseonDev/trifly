import "@/app/(default)/(ticket)/ticket-result/Filter.scss";
import { FilterProps } from "@/atoms/atoms";
import {
  ChangeEvent,
  Dispatch,
  memo,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

const PriceFilter = memo(
  ({
    prices,
    maxPrice: initialMaxPrice,
    handleFilterChange,
  }: {
    prices: number[];
    maxPrice: number;
    handleFilterChange: Dispatch<SetStateAction<FilterProps>>;
  }) => {
    const minPriceValue = Math.min(...prices);
    const maxPriceValue = Math.max(...prices);
    // 기존 검색 결과가 있다면 필터에서 가져오고, 없다면 price 배열의 최댓값으로 설정
    const [maxPrice, setMaxPrice] = useState(
      initialMaxPrice === 0 ? maxPriceValue : initialMaxPrice,
    );

    const sliderRef = useRef<HTMLInputElement | null>(null);

    // 슬라이더의 백분율 계산 및 스타일 적용 함수
    const updateSliderBackground = (value: number) => {
      if (sliderRef.current) {
        const percent =
          ((value - minPriceValue) / (maxPriceValue - minPriceValue)) * 100;
        sliderRef.current.style.background = `linear-gradient(to right, var(--color-primary) 0%, var(--color-primary) ${percent}%, var(--color-gray-50) ${percent}%, var(--color-gray-50) 100%)`;
      }
    };

    // 초기 렌더링 시 슬라이더 UI 업데이트
    useEffect(() => {
      updateSliderBackground(maxPrice);
    }, [maxPrice]);

    /* -------------------------------------------------------------------------- */
    /*                                   가격 설정                                  */
    /* -------------------------------------------------------------------------- */
    const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      const newMaxPrice = Number(value);
      setMaxPrice(newMaxPrice);
      handleFilterChange((prev) => ({ ...prev, maxPrice: newMaxPrice }));
      updateSliderBackground(newMaxPrice);
    };

    return (
      <div className="filter-contents maxPrice">
        <label htmlFor="max-price">
          {`${maxPrice?.toLocaleString()}원 이하`}
        </label>
        <input
          ref={sliderRef}
          type="range"
          className="input-range horizontal"
          id="max-price"
          min={minPriceValue}
          max={maxPriceValue}
          value={maxPrice}
          step={100}
          onChange={handlePriceChange}
        />
      </div>
    );
  },
);

export default PriceFilter;
