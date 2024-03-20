import * as Notification from ".";
import { AiOutlineSchedule } from "react-icons/ai";
import { DataMenuItem } from "@shared/util-client";

export const NotificationMenu: DataMenuItem = {
  key: "notification",
  label: "Notification",
  icon: <AiOutlineSchedule />,
  render: () => <Notification.List />,
};
