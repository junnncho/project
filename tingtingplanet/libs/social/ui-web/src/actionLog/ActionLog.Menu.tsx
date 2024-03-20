import * as ActionLog from ".";
import { AiOutlineLike } from "react-icons/ai";
import { DataMenuItem } from "@shared/util-client";

export const ActionLogMenu: DataMenuItem = {
  key: "actionLog",
  label: "ActionLog",
  icon: <AiOutlineLike />,
  render: () => <ActionLog.List />,
};
