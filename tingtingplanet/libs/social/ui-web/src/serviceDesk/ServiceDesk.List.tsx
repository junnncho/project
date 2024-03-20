import * as ServiceDesk from ".";
import { DataEditModal, DataListContainer } from "@shared/ui-web";
import { DefaultOf, ModelsProps } from "@shared/util-client";
import { gql, slice, st } from "@social/data-access";

export const ServiceDeskList = ({
  slice = st.slice.serviceDesk,
  init,
}: ModelsProps<slice.ServiceDeskSlice, gql.ServiceDesk>) => {
  return (
    <DataListContainer
      init={init}
      slice={slice}
      renderItem={ServiceDesk.Item}
      renderDashboard={ServiceDesk.Stat}
      queryMap={gql.serviceDeskQueryMap}
      edit={
        <DataEditModal slice={slice} renderTitle={(serviceDesk: DefaultOf<gql.ServiceDesk>) => `${serviceDesk.id}`}>
          <ServiceDesk.Edit slice={slice} />
        </DataEditModal>
      }
      type="list"
      columns={["type", "status", "createdAt"]}
      actions={(serviceDesk: gql.LightServiceDesk, idx) => ["remove", "edit"]}
    />
  );
};
