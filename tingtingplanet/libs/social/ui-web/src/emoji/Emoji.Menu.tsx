import * as Emoji from ".";
import { AiOutlineWarning } from "react-icons/ai";
import { DataMenuItem } from "@shared/util-client";

export const EmojiMenu: DataMenuItem = {
  key: "emoji",
  label: "Emoji",
  icon: <AiOutlineWarning />, // ! need to be customized
  render: () => <Emoji.List />,
};
