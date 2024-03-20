import * as Quest from ".";
import { AiOutlineWarning } from "react-icons/ai";
import { DataMenuItem } from "@shared/util-client";

export const QuestMenu: DataMenuItem = {
  key: "quest",
  label: "Quest",
  icon: <AiOutlineWarning />, // ! need to be customized
  render: () => <Quest.List />,
};
