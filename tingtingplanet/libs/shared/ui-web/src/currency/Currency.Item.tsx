import { DataItem } from "@shared/ui-web";
import { ModelProps } from "@shared/util-client";
import { gql, slice, st } from "@shared/data-access";

export const CurrencyItem = ({
  className,
  currency,
  slice = st.slice.currency,
  actions,
  columns,
}: ModelProps<slice.CurrencySlice, gql.LightCurrency>) => {
  return (
    <DataItem
      className={className}
      title={`${currency.name}`}
      model={currency}
      slice={slice}
      actions={actions}
      columns={columns}
    />
  );
};
