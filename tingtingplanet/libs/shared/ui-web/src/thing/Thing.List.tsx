import * as Thing from ".";
import { DataEditModal, DataListContainer } from "@shared/ui-web";
import { DefaultOf, ModelsProps } from "@shared/util-client";
import { gql, slice, st } from "@shared/data-access";

export const ThingList = ({ slice = st.slice.thing, init }: ModelsProps<slice.ThingSlice, gql.Thing>) => {
  return (
    <DataListContainer
      init={init}
      slice={slice}
      renderItem={Thing.Item}
      renderDashboard={Thing.Stat}
      queryMap={gql.thingQueryMap}
      edit={
        <DataEditModal slice={slice} renderTitle={(thing: DefaultOf<gql.Thing>) => `${thing.name}`}>
          <Thing.Edit slice={slice} />
        </DataEditModal>
      }
      type="list"
      columns={["purpose", "description"]}
      actions={["edit"]}
    />
  );
};
