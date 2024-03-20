import * as Job from ".";
import { AiOutlineWarning } from "react-icons/ai";
import { DataMenuItem } from "@shared/util-client";

export const JobMenu: DataMenuItem = {
  key: "job",
  label: "Job",
  icon: <AiOutlineWarning />, // ! need to be customized
  render: () => <Job.List />,
};
