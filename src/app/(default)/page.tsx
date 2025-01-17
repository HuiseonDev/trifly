import { auth } from "@/auth";
import Badge from "@/components/Badge/Badge";
import Banner from "@/components/Banner/Banner";
import RecentSearch from "@/components/RecentSearch/RecentSearch";
import Link from "next/link";
import "./main.scss";
import { fetchCodes } from "@/data/fetch/fetchCode";
import { AirportData } from "@/types";
import TicketSearchBox from "@/components/TicketSearch/TicketSearchBox";
import Image from "next/image";

const Home = async () => {
  const session = await auth();
  const user = !!session?.user;
  const { code, airportCode } = await fetchCodes<AirportData>();

  return (
    <div className="main">
      <h2 className="hidden">메인</h2>
      <section className="search-container full-width">
        <h3 className="hidden">항공권 검색</h3>
        <TicketSearchBox code={code} airport={airportCode} />
      </section>

      <RecentSearch />

      <Banner user={user} />

      <section className="notices">
        <div className="notice-menu">
          <h3>공지사항</h3>
          <Link href="/notice">
            <span>더보기</span>
            <div className="img-box">
              <Image
                src="img/icon-arrow.svg"
                alt="더보기"
                width={0}
                height={0}
                sizes="100%"
              />
            </div>
          </Link>
        </div>

        <div className="notice-items">
          <div className="notice-item">
            <Badge type="secondary">NEW</Badge>
            <Link href="/notice/infuel">2025년 1월 유류할증 안내</Link>
            <p className="pc">2024.12.23</p>
          </div>
          <div className="notice-item">
            <Badge>HOT</Badge>
            <Link href="/notice/1">
              최초 발권 후 24시 이내 환불 처리 방침 변경 항공(국제선) 안내
            </Link>
            <p className="pc">2024.08.01</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
