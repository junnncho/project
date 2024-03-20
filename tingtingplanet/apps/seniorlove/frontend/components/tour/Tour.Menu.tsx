import * as Tour from ".";
import { AiOutlineWarning } from "react-icons/ai";
import { DataMenuItem } from "@shared/util-client";

export const TourMenu: DataMenuItem = {
  key: "tour",
  label: "Tour",
  icon: <AiOutlineWarning />, // ! need to be customized
  render: () => <Tour.List />,
};
