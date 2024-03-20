import * as ChatRoom from ".";
import { AiOutlineWechat } from "react-icons/ai";
import { DataMenuItem } from "@shared/util-client";

export const ChatRoomMenu: DataMenuItem = {
  key: "chatRoom",
  label: "ChatRoom",
  icon: <AiOutlineWechat />,
  render: () => <ChatRoom.List />,
};
