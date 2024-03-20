import * as Comment from ".";
import { AiOutlineWechat } from "react-icons/ai";
import { DataMenuItem } from "@shared/util-client";

export const CommentMenu: DataMenuItem = {
  key: "comment",
  label: "Comment",
  icon: <AiOutlineWechat />,
  render: () => <Comment.List />,
};
