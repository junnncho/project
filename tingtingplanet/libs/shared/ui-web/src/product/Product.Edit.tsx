import { DataEditField, Field } from "@shared/ui-web";
import { DefaultOf } from "@shared/util-client";
import { gql, slice, st, usePage } from "@shared/data-access";

interface ProductEditProps {
  productId?: string | null;
  slice?: slice.ProductSlice;
}

// * 데이터 수정/생성 템플릿을 작성하세요. 외부에서 Modal, Div 등으로 컨테이너에 담을 용도로 Fragment(<></>) 기반으로 제작하세요.
export const ProductEdit = ({ slice = st.slice.product, productId = undefined }: ProductEditProps) => {
  const productForm = slice.use.productForm();
  const { l } = usePage();
  return (
    <>
      <Field.Text label={l(`product.name`)} value={productForm.name} onChange={slice.do.setNameOnProduct} />
      <Field.Text
        label={l(`product.description`)}
        value={productForm.description}
        onChange={slice.do.setDescriptionOnProduct}
      />
      {/* <Select value={type} style={{ width: "100%" }} onChange={(type) => slice.setState({ type })}>
        {cnst.productTypes.map((type) => (
          <Select.Option value={type}>{type}</Select.Option>
        ))}
      </Select> */}
      <Field.Img
        label={l(`product.image`)}
        addFiles={slice.do.uploadImageOnProduct}
        file={productForm.image}
        onRemove={() => slice.do.setImageOnProduct(null)}
      />
    </>
  );
};
const ProductEditInChild = ({ slice = st.slice.product }: ProductEditProps) => {
  const { l } = usePage();
  const productForm = slice.use.productForm();
  return (
    <DataEditField slice={slice} renderTitle={(product: DefaultOf<gql.Product>) => `${product.name}`}>
      <Field.Text label={l(`product.name`)} value={productForm.name} onChange={slice.do.setNameOnProduct} />
      <Field.Text
        label={l(`product.description`)}
        value={productForm.description}
        onChange={slice.do.setDescriptionOnProduct}
      />
      <Field.Img
        label={l(`product.image`)}
        addFiles={slice.do.uploadImageOnProduct}
        file={productForm.image}
        onRemove={() => slice.do.setImageOnProduct(null)}
      />
    </DataEditField>
  );
};

ProductEdit.InChild = ProductEditInChild;
