import * as GroupCall from ".";
import { AiOutlineAliwangwang } from "react-icons/ai";
import { DataMenuItem } from "@shared/util-client";

export const GroupCallMenu: DataMenuItem = {
  key: "groupCall",
  label: "GroupCall",
  icon: <AiOutlineAliwangwang />, // ! need to be customized
  render: () => <GroupCall.List />,
};
