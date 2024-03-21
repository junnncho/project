import { CommuLand, ProfileLand } from "../land";
import { DailyRecommend } from "../recommendbar";
import { useAppSelector } from "../hooks/typeRedux";

import { PageType } from "src/props";
export const RightBanner = () => {
  const page = useAppSelector((state) => state.PageReducer.page);

  const pickBanner = (p: PageType) => {
    switch (p) {
      case "profile":
        return <ProfileLand />;
      case "total":
        return <DailyRecommend />;
      case "unit":
        return <CommuLand />;
    }
  };

  return <div className="RightBanner">{pickBanner(page)}</div>;
};
