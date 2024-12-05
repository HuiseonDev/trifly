# TriFly

![Frame 30](https://github.com/user-attachments/assets/5edf2b25-7bce-4432-bd0e-57d49586b1e1)

> 배포 링크
> **https://trifly.vercel.app**

<br/>

<p align=center>
  <a href="https://meadow-hydrogen-e0d.notion.site/PASSPORT-a1f40332c9aa4af0b96cb326ff34dfe3">팀 노션</a>
  &nbsp; | &nbsp;
  <a href="https://docs.google.com/spreadsheets/d/1zGIht0h751fY8YmtPecdMdpFqrwfU584OrK5PBmjd-k/edit?gid=0#gid=0">요구사항 정의서</a>   &nbsp; | &nbsp;
  <a href="https://www.figma.com/design/JrEiJJOCJB035mRysV3sbq/PASSPORT?node-id=1-2&t=M1ghG7ydxZtgDUSj-1">figma</a>
  &nbsp; | &nbsp;
  <a href="https://github.com/FRONTENDSCHOOLPLUS2/trifly/wiki">개발 위키</a>
</p>

<div align=center>
    <a href="https://hits.seeyoufarm.com"><img src="https://hits.seeyoufarm.com/api/count/incr/badge.svg?url=https%3A%2F%2Fgithub.com%2FFRONTENDSCHOOLPLUS2%2Ftrifly&count_bg=%23FF5B10&title_bg=%23555555&icon=&icon_color=%23E7E7E7&title=hits&edge_flat=false"/></a>
</div>

## 📄 목차

- [📄 목차](#-목차)
- [✍🏻 프로젝트 개요](#-프로젝트-개요)
- [🚀 핵심 기능](#-핵심-기능)
  - [어떤 기기로든 편리하게 항공권을 검색할 수 있어요.](#어떤-기기로든-편리하게-항공권을-검색할-수-있어요)
  - [원하는 정보를 바로 필터링할 수 있어요.](#원하는-정보를-바로-필터링할-수-있어요)
  - [선택한 항공권을 구매할 수 있어요.](#선택한-항공권을-구매할-수-있어요)
  - [항공편에 따라 원하는 좌석을 선택할 수 있어요.](#항공편에-따라-원하는-좌석을-선택할-수-있어요)
  - [나만의 티켓을 꾸미고 기록을 확인할 수 있어요.](#나만의-티켓을-꾸미고-기록을-확인할-수-있어요)
- [⚙️ 기술 스택](#️-기술-스택)
- [🏛️ 서비스 구조](#️-서비스-구조)
  - [요구사항 정의서](#요구사항-정의서)
  - [플로우 차트](#플로우-차트)
- [🔎 FE 기술적 도전](#-fe-기술적-도전)

  - [반응형 UI](#반응형-ui)
  - [타입 지정](#타입-지정)
  - [아마데우스 api 사용](#아마데우스-api-사용)
  - [항공권 필터링](#항공권-필터링)
  - [좌석 배치도](#좌석-배치도)
  - [웹 접근성 고려](#웹-접근성-고려)
  - [캔버스](#캔버스)

- [🧡 팀원 소개](#-팀원-소개)

<br />

## ✍🏻 프로젝트 개요

TriFly는 항공권 예약 사이트입니다. 다양한 검색 조건을 설정하여 나에게 맞는 항공권을 검색할 수 있습니다. 항공권 구매 후 좌석 지정도 가능합니다. 발권된 티켓을 나만의 티켓으로 커스텀하고 내 항공 여행 기록을 확인할 수 있습니다.

<br />

## 🚀 핵심 기능

### 어떤 기기로든 편리하게 항공권을 검색할 수 있어요.

> 사용자의 환경을 고려하여 구현된 항공권 검색 UI를 이용하여 손쉽게 항공권을 검색할 수 있어요.

<table>
    <thead>
        <tr>
            <th>웹</th>
            <th>모바일</th>
        </tr>
    </thead>
    <tbody>
        <tr>
          <td width="75%" align="center">
            <img alt="" src="https://github.com/user-attachments/assets/8c9a3dfe-308d-491a-90cb-623db0f04880" width="100%" />
          </td>
          <td width="25%" align="center">
            <img alt="" src="https://github.com/user-attachments/assets/2c24a5cf-0818-4f14-9b61-5a7555aa95f4" width="100%" />
          </td>
        </tr>
    </tbody>
</table>

### 원하는 정보를 바로 필터링할 수 있어요.

> 직항, 출발/도착 시간, 원하는 항공사, 가격대 등을 선택하여 내게 딱 맞는 항공편을 조회해보세요.

<table>
    <thead>
        <tr>
            <th>웹</th>
            <th>모바일</th>
        </tr>
    </thead>
    <tbody>
        <tr>
          <td width="75%" align="center">
            <img alt="" src="https://github.com/user-attachments/assets/24ffc0f6-040b-4c68-80b0-067b6da9cbc5" width="100%" />
          </td>
          <td width="25%" align="center">
            <img alt="" src="https://github.com/user-attachments/assets/4c0c41e0-5e70-4c6b-b3d6-042644671f0f" width="100%" />
          </td>
        </tr>
    </tbody>
</table>

### 선택한 항공권을 구매할 수 있어요.

> 약관 동의부터 정보 입력, 결제까지 항공권 구매 프로세스를 경험할 수 있어요.

- **항공편 상세 조회** : 경유지 정보, 항공기 정보, 수하물 정보, 공동운항 정보
- **운임 상세 조회** : 탑승자 연령대 별 항공료, 유류할증료, 제세공과금 등의 요금 상세

<table>
    <thead>
        <tr>
            <th>웹</th>
            <th>모바일</th>
        </tr>
    </thead>
    <tbody>
        <tr>
          <td width="75%" align="center">
            <img alt="" src="https://github.com/user-attachments/assets/b0b161d3-33c9-45ae-8916-4acd871e9d54" width="100%" />
          </td>
          <td width="25%" align="center">
            <img alt="" src="https://github.com/user-attachments/assets/8800f41e-e06c-4596-9a38-ed2fac2be72c" width="100%" />
          </td>
        </tr>
        <tr>
          <td width="75%" align="center">
            <img alt="" src="https://github.com/user-attachments/assets/6e466fd8-cff0-4223-850c-210b9f099ce9" width="100%" />
          </td>
          <td width="25%" align="center">
            <img alt="" src="https://github.com/user-attachments/assets/7ae2b5fe-6fb8-4bec-aa6d-a758e470a5a9" width="100%" />
          </td>
        </tr>
    </tbody>
</table>

### 항공편에 따라 원하는 좌석을 선택할 수 있어요.

> 탑승하는 항공기의 좌석 배치도를 확인하고 원하는 좌석을 선택할 수 있어요.

<table>
    <thead>
        <tr>
            <th>웹</th>
            <th>모바일</th>
        </tr>
    </thead>
    <tbody>
        <tr>
          <td width="75%" align="center">
            <img alt="" src="https://github.com/user-attachments/assets/8198f43f-252e-45d5-871d-c79e51ba47c5" width="100%" />
          </td>
          <td width="25%" align="center">
            <img alt="" src="https://github.com/user-attachments/assets/7793c274-3813-4255-bef3-3decd983809a" width="100%" />
          </td>
        </tr>
    </tbody>
</table>

### 나만의 티켓을 꾸미고 기록을 확인할 수 있어요.

> 티켓을 커스텀하여 나만의 티켓을 만들어 보세요. '발자국' 메뉴에서 내 여행 기록도 확인할 수 있어요.

<table>
    <thead>
        <tr>
            <th>웹</th>
            <th>모바일</th>
        </tr>
    </thead>
    <tbody>
        <tr>
          <td width="75%">
            <img alt="" src="https://github.com/user-attachments/assets/8f38e872-b43a-4b6c-9ceb-a47a7adb6a7c" width="100%" />
          </td>
          <td width="25%">
            <img alt="" src="https://github.com/user-attachments/assets/0edaa5f8-d426-4701-8679-2e644cc96dbb" width="100%" />
          </td>
        </tr>
    </tbody>
</table>

<br />

## 💻 담당 기능

### 이소정

**[ 로그인 / 회원가입 ]**

- 이메일 로그인 및 회원가입
- 소셜 로그인 및 회원가입 (카카오, 구글)

**[ 항공권 구매 ]**

- 항공편 정보 및 약관 동의
- 탑승객 정보 입력 및 결제
- 예약 상세 내역 및 티켓 확인

**[ 발자국 ]**

- 여행 기록 통계 및 연도별 티켓 조회
- 포토 티켓 커스텀 및 저장

**[ 공통 ]**

- 항공권 검색 로딩
- 아코디언
- 프로그레스 바
- 포토 티켓

---

### 전희선

**[ 항공편 좌석 선택 ]**

- 항공편 기종별 좌석 렌더링
- 탑승자별 좌석 선택

**[ 예약 내역 ]**

- 예약 목록 조회
- 예약 상세 조회 및 E-Ticket 출력

**[ 공통 ]**

- 푸터
- 로딩
- 에러

---

### 정진욱

**[ 메인 ]**

- 항공권 검색
- “나만의 티켓 꾸미기” 배너

**[ 항공권 검색 결과 ]**

- 항공권 검색 결과 조회
- 항공권 검색 결과 필터링

**[ 공통 ]**

- 헤더
- 버튼 & 링크
- 모달

<br />

## ⚙️ 기술 스택

<table>
    <thead>
        <tr>
            <th>분류</th>
            <th>기술 스택</th>
        </tr>
    </thead>
    <tbody>
        <tr>
          <td>
            <p>프론트엔드</p>
          </td>
          <td>
            <img src="https://img.shields.io/badge/Next.js-000000?logo=Next.js&logoColor=white">
            <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=ffffff">
            <img src="https://img.shields.io/badge/react-61DAFB?logo=react&logoColor=333333">
            <img src="https://img.shields.io/badge/sass-CC6699?logo=sass&logoColor=white">
          </td>
        </tr>
        <tr>
            <td>
                <p>패키지 매니저</p>
            </td>
            <td>
              <img src="https://img.shields.io/badge/npm-c12127?logo=npm&logoColor=ffffff">
            </td>
        </tr>
                <tr>
            <td>
                <p>배포</p>
            </td>
            <td>
                <img src="https://img.shields.io/badge/Vercel-000000?logo=Vercel&logoColor=white">
            </td>
        </tr>
        <tr>
            <td>
                <p>협업</p>
            </td>
            <td>
                <img src="https://img.shields.io/badge/Notion-000000?logo=Notion">
                <img src="https://img.shields.io/badge/Figma-F24E1E?logo=Figma&logoColor=ffffff">
            </td>
        </tr>
    </tbody>
</table>

<br />

## 🏛️ 서비스 구조

### 요구사항 정의서

<img width="100%" alt="요구사항 정의서" src="https://github.com/user-attachments/assets/f3c9f762-28d2-4e28-a772-bcd7e055d316">

### 플로우 차트

| 로그인 & 회원가입                                                                                                          |
| -------------------------------------------------------------------------------------------------------------------------- |
| <img width="100%" alt="플로우 차트" src="https://github.com/user-attachments/assets/80a146ff-5b0f-45d0-8b87-3f2fff742d37"> |

| 포토티켓                                                                                                                   |
| -------------------------------------------------------------------------------------------------------------------------- |
| <img width="100%" alt="플로우 차트" src="https://github.com/user-attachments/assets/ecaa8f1b-6258-4ae8-9126-569a8f3878e0"> |

| 항공권 구매                                                                                                                |
| -------------------------------------------------------------------------------------------------------------------------- |
| <img width="100%" alt="플로우 차트" src="https://github.com/user-attachments/assets/5a228650-9f7b-41bf-bf11-9ed98772c08c"> |

<br />

## 🔎 FE 기술적 도전

### 반응형 UI

- 공통으로 사용하는 CSS variable을 등록해 사용하면서 스타일 변경사항을 한 번에 적용 가능하였고, 반응형 작업을 수월하게 진행할 수 있었습니다.
- rem, vw 등 상대적 단위를 사용하여 디바이스 너비에 유연하게 대처했습니다.

<details>
<summary>responsive.scss</summary>
<div markdown="1">

```scss
:root {
  --header-height: 7.2rem;

  --layout-pc: 1080px;
  --layout-padding: 3rem --layout-header-bottom: 4rem;

  --title-max: 2.4rem;
  --title-extra: 2rem;
  --title-large: 1.8rem;
  --title-big: 1.6rem;
  --title-medium: 1.4rem;
  --title-small: 1.2rem;
  --title-min: 1rem;
}

@media (max-width: 1023px) {
  :root {
    --layout-padding: 1.6rem;
    --header-height: 5.6rem;

    --title-max: 2rem;
    --title-extra: 1.8rem;
    --title-large: 1.6rem;
    --title-big: 1.4rem;
    --title-medium: 1.2rem;
    --title-small: 1.1rem;
    --title-min: 0.8rem;

    min-width: 320px;
  }

  .mo {
    display: block;
  }

  .pc {
    display: none;
  }
}
```

</div>
</details>

<table>
    <thead>
        <tr>
            <th colspan="2">반응형</th>
        </tr>
    </thead>
    <tbody>
        <tr>
          <td width="50%">
            <img alt="" src="https://github.com/user-attachments/assets/acec28cb-e0e9-4203-b0b3-752cf6fbe58f" width="100%" />
          </td>
          <td width="50%">
            <img alt="" src="https://github.com/user-attachments/assets/efa60a3e-97d3-4f5d-b3cd-2ddae76620fd" width="100%" />
          </td>
        </tr>
    </tbody>
</table>

### 타입 지정

- 오픈 마켓 api, 아마데우스 api 요청과 응답의 타입을 미리 지정하였습니다.
- 사용하는 api의 응답 데이터의 **depth가 깊고**, **양이 방대한** 상황에서 코드를 작성할 때부터 지정된 타입을 확인하여 **에러를 미연에 방지**하고, **효율적인 코드를 작성**할 수 있었습니다.
- 개발 전에 반복적으로 사용되는 데이터의 타입을 따로 지정 후 `extends`, `Pick`, `Omit` 등의 키워드를 활용하여 **확장성과 재사용성**을 높였습니다.

| 아마데우스 데이터                                                                                                 | 타입 지정                                                                                                         |
| ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| <img alt="" src="https://github.com/user-attachments/assets/17172682-64fc-456f-8afa-dc758ccb5f59" width="100%" /> | <img alt="" src="https://github.com/user-attachments/assets/8aa4cd7e-c458-43b7-9988-0bcc915279e6" width="100%" /> |

| 타입 자동 완성                                                                                                    | 타입 오류 방지                                                                                                    |
| ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| <img alt="" src="https://github.com/user-attachments/assets/3a231f03-6a71-4399-b669-cf1593e03aa3" width="100%" /> | <img alt="" src="https://github.com/user-attachments/assets/f76a75f5-e02a-46c4-a6ab-807d099f2325" width="100%" /> |

### 아마데우스 api 사용

아마데우스에서 제공하는 무료 api인 **self-service api**를 활용하였습니다.

> **아마데우스**
>
> - 여행, 항공 업계에서 세계 최대 규모의 발권 시스템 제작 기업으로, 전 세계 120여개 항공사에서 사용 중입니다.
> - 우리나라에서 대표적으로 대한항공과 아시아나항공에서 이용하고 있습니다.

<details>
<summary>아마데우스 토큰</summary>
<div markdown="1">

```ts
const fetchAuth = async (): Promise<string> => {
  const url = `${AMADEUS_API_SERVER}/v1/security/oauth2/token`;
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "client_credentials",
      client_id: AMADEUS_CLIENT_ID,
      client_secret: AMADEUS_CLIENT_SECRET,
    }),
  });

  const resJson: ITokenSuccess = await res.json();

  if (!resJson.access_token) {
    throw new Error("Amadeus access_token을 불러올 수 없습니다!");
  }

  const accessToken = resJson.access_token;

  return accessToken;
};
```

</div>
</details>

<br/>

<details>
<summary>항공권 검색 (flight-offers-search)</summary>
<div markdown="1">

<br />

> 검색 조건을 <code>query</code> 에 담아 api를 호출하였습니다.

```ts
const fetchTicketSearch = async (
  query: string,
): Promise<OffersSearchData[]> => {
  let accessToken = await fetchAuth();

  const url = `${AMADEUS_API_SERVER}/v2/shopping/flight-offers?${query}`;

  try {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      next: { revalidate: 0 },
    });

    if (res.status === 401) {
      accessToken = await fetchAuth();

      const reRes = await fetch(url, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        next: { revalidate: 0 },
      });

      const reResJson: OffersSearch = await reRes.json();

      if (!reResJson.meta) {
        throw new Error("검색에 실패했습니다.");
      }

      return reResJson.data;
    }

    const resJson: OffersSearch = await res.json();

    if (!resJson.meta) {
      throw new Error("검색에 실패했습니다.");
    }

    return resJson.data;
  } catch (e) {
    console.error(e);
    throw new Error("오류가 발생했습니다.");
  }
};
```

</div>
</details>

<br/>

<details>
<summary>항공편 상세 조회 (flight-offers-pricing)</summary>
<div markdown="1">

<br />

> **서버 액션**을 생성하여 사용자가 선택한 항공권에 대한 여정, 가격 등 상세 정보를 요청하였습니다.

```ts
const flightPriceAction = async (
  flightOffers: OffersSearchData,
): Promise<TravelerPricing[]> => {
  let accessToken = await fetchAuth();
  const url = `${AMADEUS_API_SERVER}/v1/shopping/flight-offers/pricing`;

  const request = {
    data: {
      type: "flight-offers-pricing",
      flightOffers: [flightOffers],
    },
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-HTTP-Method-Override": "GET",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(request),
    });

    if (res.status === 401) {
      accessToken = await fetchAuth();

      const reRes = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          "X-HTTP-Method-Override": "GET",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(flightOffers),
      });

      const reResJson: OffersPrice = await reRes.json();

      if (!reResJson.data) {
        throw new Error("에러가 발생했습니다.");
      }

      return reResJson.data.flightOffers[0].travelerPricings;
    }

    const resJson: OffersPrice = await res.json();
    if (!resJson.data) {
      throw new Error("에러가 발생했습니다.");
    }

    return resJson.data.flightOffers[0].travelerPricings;
  } catch (e) {
    console.error(e);
    throw new Error("오류가 발생했습니다.");
  }
};
```

</div>
</details>

<br/>

| 항공권 조회                                                                                                       | 항공권 상세                                                                                                       |
| ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| <img alt="" src="https://github.com/user-attachments/assets/0b2aa730-2869-487f-be0b-529154dff88e" width="100%" /> | <img alt="" src="https://github.com/user-attachments/assets/df33f284-6d7b-4387-a82f-6a7f50705625" width="100%" /> |

- 한계
  - self-service api의 경우 배포용 prod 버전에서는 예약 내역 생성, 실시간 좌석 배치도 불러오기 기능을 사용하기 위해 공급업체와 계약을 체결해야 하는 어려움이 있었습니다.
  - 따라서 test 계정으로 좌석 조회 api를 호출하여 seatmap 객체를 생성해두고 동적으로 좌석 배치도를 불러와 사용하였습니다.

| seatmap 데이터                                                                                                   |
| ---------------------------------------------------------------------------------------------------------------- |
| <img alt="" src="https://github.com/user-attachments/assets/a79e3b9e-ae34-46e5-ac07-0f49e6e2137b" width="200" /> |

### 항공권 필터링

- 조건을 설정하여 api로부터 받아온 항공권 데이터를 **정렬 및 필터링**하였습니다.
  - 검색 조건 : 경유 여부, 출발/도착 시간, 항공 동맹체 및 항공사
  - 정렬 조건 : 가격, 출발시간, 도착시간

<details>
<summary>항공권 필터링 로직</summary>
<div markdown="1">

<br />

> useCallback hook으로 filter를 setting하는 함수를 메모이제이션하여 컴포넌트가 렌더링되더라도 **함수가 초기화되는 것을 방지**하였습니다.

```ts
const handleFilterChange = useCallback((newFilters: IFilterProps) => {
  setFilters((prevFilters) => ({
    ...prevFilters,
    ...newFilters,
  }));
}, []);
```

> filtering할 항목이 변경되면 기존 데이터 배열에서 `filter` 메서드를 이용하여 **조건에 맞는 항공편을 찾아 상태를 업데이트**하였습니다.

```ts
const applyFilters = () => {
  let newFilteredData = [...data];

  if (filters) {
    if (filters."필터") {
      const airlines = filters."필터";
      newFilteredData = newFilteredData.filter((offer) =>
        offer.itineraries.every((itinerary) =>
          itinerary.segments.every((segment) =>
            "비교 로직"
          )
        )
      );
    }
  }

  setFilteredData(newFilteredData);
}
```

</div>
</details>

| 항공권 필터링                                                                                                     |
| ----------------------------------------------------------------------------------------------------------------- |
| <img alt="" src="https://github.com/user-attachments/assets/1710853d-dd7a-4993-81c9-aeac5965def6" width="100%" /> |

### 좌석 배치도

- 항공기 좌석 배열(예: 3-4-3, 2-3 등)과 날개 좌석, 비상구, 화장실, 갤리 등 시설 정보를 **동적으로 받아 좌석 배치도를 구현**하였습니다.
  - 기내 x, y 좌표를 사용해 정확한 위치를 시각적으로 배치하여 구체적인 레이아웃을 제공합니다.
- 탑승자의 좌석을 배열로 관리하였습니다.
  - 여러 탑승객이 선택한 좌석을 상태 값으로 관리하여 좌석을 취소하거나 재선택하여도 해당 탑승객에게 좌석이 반영되도록 구현하였습니다.

| 좌석배치도                                                                                                        |
| ----------------------------------------------------------------------------------------------------------------- |
| <img alt="" src="https://github.com/user-attachments/assets/0f885725-e029-4d50-b05f-d3f66b35dd36" width="100%" /> |

### 웹 접근성 고려

- **헤딩 태그의 계층적 사용** 및 시맨틱 태그 사용을 통해 데이터를 그룹핑하여 전달력을 높였습니다.

<table>
    <thead>
        <tr>
            <th colspan="2">웹 접근성 고려</th>
        </tr>
    </thead>
    <tbody>
        <tr>
          <td width="50%">
            <img alt="" src="https://github.com/user-attachments/assets/1f62e3c2-0deb-420d-91a4-e73f15ec7e78" width="100%" />
          </td>
          <td width="50%">
            <img alt="" src="https://github.com/user-attachments/assets/db9e8786-392a-4ff3-a583-e7fbf1fd05f6" width="100%" />
          </td>
        </tr>
    </tbody>
</table>

- 아코디언 컴포넌트에 `aria-controls`, `aria-expanded` 속성을 활용하여 **아코디언의 제어 상태를 스크린 리더기에서 확인**할 수 있도록 하였습니다.

### 캔버스

- 캔버스 한 획 지우기

  - 획을 그릴 때마다 배열에 담고, 한 획 지우기를 누르면 **마지막 획을 배열에서 제거**했습니다.
  - 남은 획들을 다시 캔버스에 그림으로서 한 획 지우기를 구현하였습니다.

- 캔버스에서 꾸민 영역을 티켓과 사진 두 가지로 분류해서 저장하였습니다.
  - 수정된 이미지가 삽입된 **티켓 전체를 파일로 저장**할 수 있습니다.
  - 수정한 이미지를 **구매 내역(order)에도 저장**하여 추후에도 확인이 가능하도록 구현했습니다.

<table>
    <thead>
        <tr>
            <th>한 획 지우기</th>
            <th>커스텀한 티켓 저장하기</th>
        </tr>
    </thead>
    <tbody>
        <tr>
          <td width="50%">
            <img alt="" src="https://github.com/user-attachments/assets/6374cad8-a41a-4b4f-9eb8-a75f5de397af" width="100%" />
          </td>
          <td width="50%">
            <img alt="" src="https://github.com/user-attachments/assets/47ae71b7-503f-4b56-8b14-a6ffd639b088" width="100%" />
          </td>
        </tr>
    </tbody>
</table>

<br />

## 🧡 팀원 소개

|                                                       이소정                                                        |                                                       전희선                                                        | 정진욱                                                                                                            |
| :-----------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------: | ----------------------------------------------------------------------------------------------------------------- |
| <img src="https://github.com/ChatNull/frankmap/assets/84115816/8d17df8e-0da1-4c92-863a-da87705460ec" width="100" /> | <img src="https://github.com/ChatNull/frankmap/assets/84115816/3e777bdf-5e7f-47e3-a0dd-afe0a2fed078" width="100" /> | <img src="https://github.com/ChatNull/frankmap/assets/84115816/b9cd199b-61df-403b-a2c5-28ec85f5ae35" width="100"> |
|                                       [@s0zzang](https://github.com/s0zzang)                                        |                                       [@HuiseonDev](https://github.com/HuiseonDev)                                        | [@JWJung-99](https://github.com/JWJung-99)                                                                        |
