import * as Report from ".";
import { AiOutlineWarning } from "react-icons/ai";
import { DataMenuItem } from "@shared/util-client";

export const ReportMenu: DataMenuItem = {
  key: "report",
  label: "Report",
  icon: <AiOutlineWarning />,
  render: () => <Report.List />,
};
