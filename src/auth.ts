import NextAuth, { CredentialsSignin, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import google from "next-auth/providers/google";
import kakao from "next-auth/providers/kakao";
import { loginOAuth, signupWithOAuth } from "./data/actions/authAction";
import { fetchAccessToken } from "./data/fetch/fetchAccessToken";
import { OAuthUser, RefreshTokenRes, UserData } from "./types";

const SERVER = process.env.NEXT_PUBLIC_MARKET_API_SERVER;
const CLIENT_ID = process.env.NEXT_PUBLIC_MARKET_API_CLIENT_ID as string;
const TOKEN_VALIDITY_PERIOD = 3600 * 1000;

export const {
  handlers: { GET, POST },
  signIn,
  signOut,
  auth,
  unstable_update: update,
} = NextAuth({
  trustHost: true,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const res = await fetch(`${SERVER}/users/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "client-id": CLIENT_ID,
          },
          body: JSON.stringify(credentials),
        });
        const resJson = await res.json();

        if (resJson.ok) {
          const user = resJson.item;
          const userObject: User = {
            id: String(user._id),
            name: user.name,
            email: user.email,
            phone: user.phone,
            birth: user.extra.birth,
            type: user.type,
            loginType: "email",
            accessToken: user.token.accessToken,
            refreshToken: user.token.refreshToken,
            accessTokenExpires: Date.now() + TOKEN_VALIDITY_PERIOD,
          };
          return userObject;
        }
        throw new CredentialsSignin(resJson.message, { cause: resJson });
      },
    }),

    kakao({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    }),

    google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },

  pages: { signIn: "/login" },

  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "credentials") return true;
      if (!account?.providerAccountId) {
        console.error("Provider account ID is missing");
        return false;
      }

      let userInfo: UserData | null = null;
      switch (account?.provider) {
        case "credentials":
          console.log("id/pwd 로그인", user);
          return true;

        case "google":
        case "kakao":
          console.log("OAuth 로그인", user);

          try {
            // 자동 회원 가입
            // 이미 가입된 회원이면 회원가입이 되지 않고 에러를 응답하므로 무시하면 됨
            const newUser: OAuthUser = {
              type: "user",
              loginType: account.provider,
              name: user.name || "",
              email: user.email || "",
              extra: {
                ...profile,
                providerAccountId: account.providerAccountId,
              },
            };
            const result = await signupWithOAuth(newUser);

            // 자동 로그인
            const loginRes = await loginOAuth(account.providerAccountId);
            if (loginRes.ok) {
              userInfo = loginRes.item;
              console.log("userInfo", userInfo);
            } else {
              // API 서버의 에러 메시지 처리
              throw new Error(loginRes.message);
            }
          } catch (err) {
            console.error(err);
            throw err;
          }

          user.id = String(userInfo._id);
          user.type = userInfo.type;
          user.loginType = userInfo.loginType;
          user.accessToken = userInfo.token!.accessToken;
          user.refreshToken = userInfo.token!.refreshToken;
          user.accessTokenExpires = Date.now() + TOKEN_VALIDITY_PERIOD;

          break;
        default:
          return false;
      }

      return true;
    },

    async jwt({ token, user, session, trigger }) {
      if (user) {
        token.id = user.id;
        token.type = user.type;
        token.phone = user.phone;
        token.birth = user.birth;
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.loginType = user.loginType;
        token.accessTokenExpires = user.accessTokenExpires;
      }

      // 토큰 만료 확인
      if (token.accessTokenExpires && Date.now() > token.accessTokenExpires) {
        try {
          const res = await fetchAccessToken(token.refreshToken);
          if (res.ok) {
            const resJson: RefreshTokenRes = await res.json();
            return {
              ...token,
              accessToken: resJson.accessToken,
              accessTokenExpires: Date.now() + TOKEN_VALIDITY_PERIOD,
            };
          }
          if (res.status === 401) {
            console.log(
              "리플래시 토큰 인증 실패. 로그인 페이지로 이동해야 함",
              await res.json(),
            );
          }
        } catch (error) {
          if (error instanceof Error) {
            console.error(error);
            return {
              ...token,
              error: error.message,
            };
          }
        }
      }

      // 세션 없데이트
      if (trigger === "update" && session) {
        token.name = session.name;
      }

      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.loginType = token.loginType;
      session.user.birth = token.birth;
      session.user.phone = token.phone;
      return session;
    },
  },
});
