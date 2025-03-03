import RecoilRootWrapper from "@/RecoilWrapper";
import "@/styles/common.scss";
import "@/styles/globals.scss";
import "@/styles/responsive.scss";
import "@/styles/variables.scss";
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Do_Hyeon, Noto_Sans_KR, Roboto } from "next/font/google";

const roboto = Roboto({
  display: "swap",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});

const noto = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-noto",
});

const dohyeon = Do_Hyeon({
  display: "swap",
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-dohyeon",
});

export const metadata: Metadata = {
  // title: { template: `%s | 솔직할지도`, default: "솔직할지도" },
  title: "TriFly",
  description: "TriFly에서 항공권을 예매하고 Triple의 기쁨을 누려보세요!",
  authors: {
    name: "Passport",
  },
  icons: {
    icon: "/favicon.svg",
  },
  keywords:
    "항공권, 항공권 검색, 최저가 항공권, 포토 티켓, 티켓 꾸미기, 여행사, 해외여행, 해외항공, 자유여행, 국내항공, 국내여행, 제주여행",
  openGraph: {
    title: "TriFly",
    description: "TriFly에서 항공권을 예매하고 Triple의 기쁨을 누려보세요!",
    images: "/opengraph_img.svg",
    url: "https://trifly.vercel.app/",
    type: "website",
    siteName: "TriFly",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <meta
          name="google-site-verification"
          content="5-HAzgAn-5O-qMKATTMmmD-fpEcnt1w2FrwRi80jvRQ"
        />
        <link
          rel="apple-touch-icon"
          sizes="16x16"
          href="/apple-touch-icon-16x16.ico"
        />
        <link
          rel="apple-touch-icon"
          sizes="32x32"
          href="/apple-touch-icon-32x32.ico"
        />
        <link
          rel="apple-touch-icon"
          sizes="96x96"
          href="/apple-touch-icon-96x96.ico"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon-180x180.ico"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.ico"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.ico"
        />
      </head>
      <body
        className={`${roboto.variable} ${noto.variable} ${dohyeon.variable}`}
      >
        <SessionProvider>
          <RecoilRootWrapper>{children}</RecoilRootWrapper>
        </SessionProvider>
      </body>
    </html>
  );
}
