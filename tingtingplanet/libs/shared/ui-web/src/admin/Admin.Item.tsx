import { DataItem } from "@shared/ui-web";
import { ModelProps } from "@shared/util-client";
import { gql, slice, st } from "@shared/data-access";

export const AdminItem = ({
  className,
  admin,
  slice = st.slice.admin,
  actions,
  columns,
}: ModelProps<slice.AdminSlice, gql.LightAdmin>) => {
  return (
    <DataItem
      className={className}
      title={`${admin.accountId}`}
      model={admin}
      slice={slice}
      actions={actions}
      columns={columns}
    />
  );
};
