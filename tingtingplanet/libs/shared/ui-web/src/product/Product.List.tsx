import * as Product from ".";
import { DataEditModal, DataListContainer } from "@shared/ui-web";
import { DefaultOf, ModelsProps } from "@shared/util-client";
import { gql, slice, st } from "@shared/data-access";

export const ProductList = ({ slice = st.slice.product, init }: ModelsProps<slice.ProductSlice, gql.Product>) => {
  return (
    <DataListContainer
      init={init}
      slice={slice}
      renderItem={Product.Item}
      renderDashboard={Product.Stat}
      queryMap={gql.productQueryMap}
      edit={
        <DataEditModal slice={slice} renderTitle={(product: DefaultOf<gql.Product>) => `${product.name}`}>
          <Product.Edit slice={slice} />
        </DataEditModal>
      }
      type="list"
      columns={["purpose", "description"]}
      actions={["edit"]}
    />
  );
};
