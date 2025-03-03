"use client";

import Button from "@/components/Button/Button";
import "./Search.scss";

const SearchKeyWords = () => {
  return (
    <form action="#" className="search-form">
      <input
        type="text"
        placeholder="예약번호를 입력해주세요"
        className="search-input"
        name="keyword"
      />
      <Button type="submit" size="sm" bgColor="primary">
        검색
      </Button>
    </form>
  );
};

export default SearchKeyWords;
