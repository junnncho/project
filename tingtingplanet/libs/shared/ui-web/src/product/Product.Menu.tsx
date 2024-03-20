import * as Product from ".";
import { AiOutlineWarning } from "react-icons/ai";
import { DataMenuItem } from "@shared/util-client";

export const ProductMenu: DataMenuItem = {
  key: "product",
  label: "Product",
  icon: <AiOutlineWarning />, // ! need to be customized
  render: () => <Product.List />,
};
