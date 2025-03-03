import { FetchOrderList } from "@/lib/fetchOrder";
import OrdersItem from "./OrdersItem";
import "./reservation.scss";
import Pagination from "./Pagination";

const ReservationList = async ({
  page,
  keyword,
}: {
  page: string;
  keyword: string;
}) => {
  const data = await FetchOrderList(page);
  const reservationData = data.item;

  const filteredItems = keyword
    ? reservationData.filter((item) =>
        item.reservationId.substring(0, 6).includes(keyword),
      )
    : reservationData;

  return (
    <div>
      <section>
        <table className="reservation-table">
          <caption className="hidden">예약 내역 리스트</caption>
          <thead>
            <tr>
              <th className="travel">왕복/편도</th>
              <th className="reservation-number">예약 번호</th>
              <th className="departure">출발</th>
              <th className="arrival">도착</th>
              <th className="reservation-date">예약일</th>
              <th className="schedule">출발일</th>
              <th className="personnel">인원</th>
              <th className="total">총 금액</th>
            </tr>
          </thead>
          {filteredItems.length === 0 ? (
            <tbody>
              <tr>
                <td colSpan={8} className="text-center">
                  일치하는 예약번호가 없습니다
                </td>
              </tr>
            </tbody>
          ) : (
            // 필터링된 데이터를 반복 렌더링
            filteredItems.map((item) => (
              <OrdersItem key={item._id} item={item} />
            ))
          )}
        </table>
      </section>
      {/* 모바일에서는 숨기기 */}
      <Pagination
        page={page}
        totalPages={data.pagination.limit}
        list={filteredItems.length}
        itemsPerPage={5}
      />
    </div>
  );
};

export default ReservationList;
