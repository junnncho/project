import * as Thing from ".";
import { AiOutlineFileExcel } from "react-icons/ai";
import { DataMenuItem } from "@shared/util-client";

export const ThingMenu: DataMenuItem = {
  key: "thing",
  label: "Thing",
  icon: <AiOutlineFileExcel />,
  render: () => <Thing.List />,
};
