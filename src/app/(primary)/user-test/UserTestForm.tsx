"use client";

import { modalState } from "@/atoms/atoms";
import Button from "@/components/Button/Button";
import userTestAction from "@/data/actions/userTestAction";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";

interface IUserTestForm {
  rating: number;
  impression: string;
  confused: string;
  best: string;
  improvement: string;
  recommend: string;
  satisfy: string;
}

const UserTestForm = () => {
  const setModal = useSetRecoilState(modalState);
  const router = useRouter();
  const [stars, setStars] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IUserTestForm>();

  const handlePost = async (formData: IUserTestForm) => {
    formData.rating = stars;
    const res = await userTestAction("final", formData, navigator.userAgent);
    if (res.ok) {
      reset();
      setModal({
        isOpen: true,
        title: "안내",
        content: `최종 평가가 제출되었습니다. \n 평가에 참여해주셔서 진심으로 감사드립니다.`,
        buttonNum: 1,
        handleConfirm: () => {
          router.push("/");
        },
      });
    }
  };

  useEffect(() => {
    setModal({ isOpen: false });
  }, []);

  return (
    <form className="input-form" onSubmit={handleSubmit(handlePost)}>
      <div className="input-box rating-box">
        <label htmlFor="rating">
          <strong>트리플라이(TriFly)</strong>의 별점을 평가해주세요.
        </label>
        <input
          type="number"
          id="rating"
          value={stars}
          {...register("rating", {
            required: "별점을 평가해주세요.",
            min: { value: 1, message: "별점을 평가해주세요." },
          })}
        />
        <ul>
          {Array.from({ length: 5 }, (_, idx) => (
            <li key={`별점 ${idx + 1}`}>
              <button
                type="button"
                onClick={() => setStars(idx + 1)}
                className={stars && idx <= stars - 1 ? "active" : ""}
              >
                <span className="hidden">{idx + 1}점</span>
              </button>
            </li>
          ))}
        </ul>
        <span className="errorMsg">{errors && errors.rating?.message}</span>
      </div>

      <div className="input-box">
        <label htmlFor="impression">
          <strong>트리플라이(TriFly)</strong>를 처음 열었을 때 첫인상은
          어떠셨나요? (예: 깔끔하다, 복잡하다, 친근하다 등)
        </label>
        <input
          type="text"
          id="impression"
          placeholder="페이지의 첫 인상을 작성해주세요."
          {...register("impression", {
            required: "트리플라이의 첫 인상을 작성해주세요.",
            minLength: {
              value: 5,
              message: "트리플라이의 첫 인상을 5글자 이상 작성해주세요.",
            },
          })}
        />
        <span className="errorMsg">{errors && errors.impression?.message}</span>
      </div>

      <div className="input-box">
        <label htmlFor="confused">
          <strong>트리플라이(TriFly)</strong>를 사용하면서 어려운 점이나
          혼란스러웠던 부분이 있었나요? 그렇다면 어떤 부분에서 그랬나요?
        </label>
        <input
          type="text"
          id="confused"
          placeholder="사용시 어려웠던 점을 작성해주세요."
          {...register("confused", {
            required: "사용시 어려웠던 점을 작성해주세요.",
            minLength: {
              value: 5,
              message: "사용시 어려웠던 점을 5글자 이상 작성해주세요.",
            },
          })}
        />
        <span className="errorMsg">{errors && errors.confused?.message}</span>
      </div>

      <div className="input-box">
        <label htmlFor="best">
          <strong>트리플라이(TriFly)</strong>를 사용하면서 가장 좋았던 점은
          무엇인가요? (디자인, 기능 등)
        </label>
        <input
          type="text"
          id="best"
          placeholder="사용시 가장 좋았던 점을 작성해주세요."
          {...register("best", {
            required: "사용시 가장 좋았던 점을 작성해주세요.",
            minLength: {
              value: 5,
              message: "사용시 가장 좋았던 점을 5글자 이상 작성해주세요.",
            },
          })}
        />
        <span className="errorMsg">{errors && errors.best?.message}</span>
      </div>

      <div className="input-box">
        <label htmlFor="improvement">
          <strong>트리플라이(TriFly)</strong>에서 개선이 필요하다고 생각되는
          부분은 무엇인가요? (디자인, 기능 등)
        </label>
        <input
          type="text"
          id="improvement"
          placeholder="개선이 필요하다고 생각되는 부분을 작성해주세요."
          {...register("improvement", {
            required: "개선이 필요하다고 생각되는 부분을 작성해주세요.",
            minLength: {
              value: 5,
              message:
                "개선이 필요하다고 생각되는 부분을 5글자 이상 작성해주세요.",
            },
          })}
        />
        <span className="errorMsg">
          {errors && errors.improvement?.message}
        </span>
      </div>

      <div className="input-box">
        <label htmlFor="recommend">
          친구나 가족에게 이 <strong>트리플라이(TriFly)</strong>를 추천할 의향이
          있나요? 그 이유는 무엇인가요?
        </label>
        <input
          type="text"
          id="recommend"
          placeholder="트리플라이를 추천 여부에 대해 작성해주세요."
          {...register("recommend", {
            required: "트리플라이의 추천 여부을 작성해주세요.",
          })}
        />
        <span className="errorMsg">{errors && errors.recommend?.message}</span>
      </div>

      <div className="input-box">
        <label htmlFor="satisfy">
          <strong>트리플라이(TriFly)</strong>를 이용하면서 기대했던 것 중
          충족되지 않은 점이 있었나요? 있다면 어떤 부분이었나요?
        </label>
        <input
          type="text"
          id="satisfy"
          placeholder="기대했던 것이 충족되지 않은 점이 있다면 작성해주세요."
          {...register("satisfy", {
            required: "기대가 충족되지 않은 점을  작성해주세요.",
            minLength: {
              value: 5,
              message: "기대가 충족되지 않은 점을 5글자 이상 작성해주세요.",
            },
          })}
        />
        <span className="errorMsg">{errors && errors.satisfy?.message}</span>
      </div>

      <div className="button-box">
        <Button type="submit">제출하기</Button>
      </div>
    </form>
  );
};

export default UserTestForm;
