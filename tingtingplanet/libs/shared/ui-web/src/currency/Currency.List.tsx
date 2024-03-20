import * as Currency from ".";
import { DataEditModal, DataListContainer } from "@shared/ui-web";
import { DefaultOf, ModelsProps } from "@shared/util-client";
import { gql, slice, st } from "@shared/data-access";

export const CurrencyList = ({ slice = st.slice.currency, init }: ModelsProps<slice.CurrencySlice, gql.Currency>) => {
  return (
    <DataListContainer
      init={init}
      slice={slice}
      renderItem={Currency.Item}
      renderDashboard={Currency.Stat}
      queryMap={gql.currencyQueryMap}
      edit={
        <DataEditModal slice={slice} renderTitle={(currency: DefaultOf<gql.Currency>) => `${currency.name}`}>
          <Currency.Edit slice={slice} />
        </DataEditModal>
      }
      columns={["type", "symbol"]}
      actions={["edit"]}
    />
  );
};
