import { DataItem } from "@shared/ui-web";
import { ModelProps } from "@shared/util-client";
import { gql, slice, st } from "@social/data-access";

export const ServiceDeskItem = ({
  className,
  serviceDesk,
  slice = st.slice.serviceDesk,
  actions,
  columns,
}: ModelProps<slice.ServiceDeskSlice, gql.LightServiceDesk>) => {
  return (
    <DataItem
      className={className}
      title={`${serviceDesk.id}`}
      model={serviceDesk}
      slice={slice}
      actions={actions}
      columns={columns}
    />
  );
};
