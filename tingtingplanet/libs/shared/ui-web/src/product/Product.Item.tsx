import { DataItem } from "@shared/ui-web";
import { ModelProps } from "@shared/util-client";
import { gql, slice, st } from "@shared/data-access";

export const ProductItem = ({
  className,
  product,
  slice = st.slice.product,
  actions,
  columns,
}: ModelProps<slice.ProductSlice, gql.LightProduct>) => {
  return (
    <DataItem
      className={className}
      title={`${product.name}`}
      model={product}
      slice={slice}
      actions={actions}
      columns={columns}
    />
  );
};
