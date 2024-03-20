import * as Currency from ".";
import { AiOutlineDollar } from "react-icons/ai";
import { DataMenuItem } from "@shared/util-client";

export const CurrencyMenu: DataMenuItem = {
  key: "currency",
  label: "Currency",
  icon: <AiOutlineDollar />,
  render: () => <Currency.List />,
};
