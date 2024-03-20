import * as Keyring from ".";
import { DataListContainer } from "@shared/ui-web";
import { ModelsProps } from "@shared/util-client";
import { gql, slice, st } from "@shared/data-access";

export const KeyringList = ({ slice = st.slice.keyring, init }: ModelsProps<slice.KeyringSlice, gql.Keyring>) => {
  return (
    <DataListContainer
      init={init}
      slice={slice}
      renderItem={Keyring.Item}
      renderDashboard={Keyring.Stat}
      queryMap={gql.keyringQueryMap}
      type="list"
      columns={["id", "name", "accountId", "phone", "verifies"]}
      actions={["remove"]}
    />
  );
};
