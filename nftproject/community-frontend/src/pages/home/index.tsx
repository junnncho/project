import { useEffect } from "react";
import { useAppDispatch } from "src/components/hooks";
import { HomeSearch } from "src/components/searchBar";
import { MyCommunity } from "src/pages/home/myCommunity";
import { setPage } from "src/redux/actions/page";
import "./home.css";
export const HomePage: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setPage("home"));
  }, []);
  return (
    <div className="Home">
      <div className="top5">
        <HomeSearch />
      </div>
      <div className="top2">
        <MyCommunity />
      </div>
    </div>
  );
};
