import { AiOutlineDollar, AiOutlineWarning } from "react-icons/ai";
import { DataMenuItem } from "@shared/util-client";

export const KeyringMenu: DataMenuItem = {
  key: "keyring",
  label: "Keyring",
  icon: <AiOutlineWarning />, // ! need to be customized
  render: () => <AiOutlineDollar />,
};
