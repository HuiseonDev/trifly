import { userTestVisitedState } from "@/atoms/atoms";
import { useRecoilState } from "recoil";

const useAddVisitedPage = () => {
  const [userVisited, setUserVisited] = useRecoilState(userTestVisitedState);
  const setVisitedPage = (page: string) => {
    if (!userVisited.includes(page)) setUserVisited([...userVisited, page]);
  };
  return { setVisitedPage };
};

export default useAddVisitedPage;
