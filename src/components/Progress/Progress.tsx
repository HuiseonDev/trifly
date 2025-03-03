"use client";

import { userTestVisitedState } from "@/atoms/atoms";
import { useRecoilState } from "recoil";
import "./progress.scss";

const Progress = ({
  textArr,
  status = 4,
  mode = "default",
}: {
  textArr: string[];
  status: number;
  mode?: string;
}) => {
  const [userVisited] = useRecoilState(userTestVisitedState);

  const li = textArr.map((item, idx) => {
    return mode === "default" ? (
      <li key={idx} className={idx + 1 <= status ? "act" : ""}>
        {item}
      </li>
    ) : (
      <li
        key={idx}
        className={userVisited.includes(item) ? "act visitedPage" : ""}
      >
        {item}
      </li>
    );
  });

  return (
    <div className="progress">
      <ul>{li}</ul>
    </div>
  );
};

export default Progress;
