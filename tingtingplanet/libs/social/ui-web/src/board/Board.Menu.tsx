import * as Board from ".";
import { AiOutlineForm } from "react-icons/ai";
import { DataMenuItem } from "@shared/util-client";

export const BoardMenu: DataMenuItem = {
  key: "board",
  label: "Board",
  icon: <AiOutlineForm />,
  render: () => <Board.List />,
};
