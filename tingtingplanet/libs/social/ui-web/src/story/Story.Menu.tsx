import * as Story from ".";
import { AiOutlineFontColors } from "react-icons/ai";
import { DataMenuItem } from "@shared/util-client";

export const StoryMenu: DataMenuItem = {
  key: "story",
  label: "Story",
  icon: <AiOutlineFontColors />,
  render: () => <Story.List />,
};
