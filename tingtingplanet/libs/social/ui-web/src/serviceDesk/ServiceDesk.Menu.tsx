import * as ServiceDesk from ".";
import { AiOutlineSchedule } from "react-icons/ai";
import { DataMenuItem } from "@shared/util-client";

export const ServiceDeskMenu: DataMenuItem = {
  key: "serviceDesk",
  label: "ServiceDesk",
  icon: <AiOutlineSchedule />,
  render: () => <ServiceDesk.List />,
};
