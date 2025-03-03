"use client";

import { loginTypeState, modalState, savedEmailState } from "@/atoms/atoms";
import Anchor from "@/components/Anchor/Anchor";
import Submit from "@/components/Submit/Submit";
import {
  signInWithCredentials,
  signInWithGoogle,
  signInWithKakao,
} from "@/data/actions/authAction";
import { UserForm, UserLoginForm } from "@/types";
import { ChangeEvent, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

const LoginForm = () => {
  const setModal = useSetRecoilState(modalState);
  const [savedEmail, setSavedEmail] = useRecoilState(savedEmailState);
  const loginType = useRecoilValue(loginTypeState);
  const savedEmailInput = useRef<null | HTMLInputElement>(null);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
    setError,
  } = useForm<UserForm>({});

  const handleTestUser = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target!.checked) {
      setValue("email", "test@trifly.com");
      setValue("password", "11111111");
    } else reset();
  };

  const login = async (loginData: UserLoginForm) => {
    const resData = await signInWithCredentials(loginData);
    if (!resData) {
      // 로그인 완료
      if (savedEmailInput.current) {
        if (savedEmailInput.current.checked)
          setSavedEmail({ isEmailSaved: true, savedEamil: loginData.email });
        else setSavedEmail({ isEmailSaved: false, savedEamil: "" });
      }
    } else if (!resData.ok) {
      // 로그인 실패
      if ("errors" in resData) {
        resData.errors.forEach((error) =>
          setError(error.path, { message: error.msg }),
        );
      } else if (resData.message) {
        setModal({
          isOpen: true,
          closeButton: false,
          title: "안내",
          content: resData.message,
          buttonNum: 1,
          handleConfirm: () => {},
          handleCancel: () => {},
        });
      }
    }
  };

  useEffect(() => {
    if (savedEmail.isEmailSaved) {
      savedEmailInput.current!.checked = true;
      setValue("email", savedEmail.savedEamil);
    }
  }, []);

  return (
    <form className="form">
      <section>
        <h3 className="hidden">일반 로그인</h3>
        <>
          <div className="input-box">
            <input
              type="text"
              placeholder="이메일"
              id="email"
              {...register("email", {
                required: "이메일을 입력하세요.",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "이메일 형식이 아닙니다.",
                },
              })}
            />
          </div>
          <div className="input-box">
            <input
              type="password"
              placeholder="비밀번호"
              id="password"
              {...register("password", {
                required: "비밀번호를 입력하세요.",
              })}
            />
          </div>

          <div className="input-box">
            {/* <div className="chk-box">
              <input
                type="checkbox"
                name="getTestUser"
                id="getTestUser"
                onChange={(e) => handleTestUser(e)}
              />
              <label htmlFor="getTestUser">테스트 계정 불러오기</label>
            </div> */}
            <div className="chk-box">
              <input
                type="checkbox"
                name="saveEmail"
                id="saveEmail"
                ref={savedEmailInput}
              />
              <label htmlFor="saveEmail">이메일 저장</label>
            </div>
          </div>

          <div className="btn-box">
            <Submit size="full" onClick={handleSubmit(login)}>
              로그인
            </Submit>
            <Anchor bgColor="gray" href="/signup">
              회원가입
            </Anchor>
          </div>
        </>
      </section>

      <section className="sns-wrap">
        <h3 className="sns-tit">
          <span>SNS</span> <span className="hidden">로그인</span>
        </h3>
        <div className="sns-box">
          <button
            type="submit"
            className={`kakao ${loginType === "kakao" ? "act" : ""}`}
            formAction={signInWithKakao}
          >
            <h4 className="hidden">카카오로 로그인</h4>
          </button>
          <button
            type="submit"
            className={`google ${loginType === "google" ? "act" : ""}`}
            formAction={signInWithGoogle}
          >
            <h4 className="hidden">구글로 로그인</h4>
          </button>
        </div>
      </section>
    </form>
  );
};

export default LoginForm;
