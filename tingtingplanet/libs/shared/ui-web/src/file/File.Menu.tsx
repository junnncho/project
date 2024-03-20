import * as File from ".";
import { AiOutlineFile } from "react-icons/ai";
import { DataMenuItem } from "@shared/util-client";

export const FileMenu: DataMenuItem = {
  key: "file",
  label: "File",
  icon: <AiOutlineFile />,
  render: () => <File.List />,
};
