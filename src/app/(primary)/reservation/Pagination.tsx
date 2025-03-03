"use client";

import "./pagination.scss";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

interface PaginationPropType {
  page: number | string;
  totalPages: number;
  list: number;
  itemsPerPage: number;
}

const Pagination: React.FC<PaginationPropType> = ({ totalPages, list }) => {
  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page");
  const page = pageParam ? parseInt(pageParam, 10) : 1;
  const pageList = [];
  const listItems = 5;
  const dynamicTotalPages =
    list < totalPages ? Math.ceil(list / listItems) : totalPages;

  for (let i = 1; i <= dynamicTotalPages; i += 1) {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set("page", String(i));
    const search = newSearchParams.toString();

    pageList.push(
      <li key={i} className="pagination-number">
        <Link
          href={`/reservation?${search}`}
          className={String(page) === String(i) ? "active" : "unactive"}
        >
          {i}
        </Link>
      </li>,
    );
  }

  return (
    <div className="pagination">
      <ul>{pageList}</ul>
    </div>
  );
};

export default Pagination;
