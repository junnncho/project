import * as Admin from ".";
import { AiOutlineMonitor } from "react-icons/ai";
import { DataMenuItem } from "@shared/util-client";

export const AdminMenu: DataMenuItem = {
  key: "admin",
  label: "Admin",
  icon: <AiOutlineMonitor />,
  render: () => <Admin.List />,
};
