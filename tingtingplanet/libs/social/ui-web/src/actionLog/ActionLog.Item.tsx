import { DataItem } from "@shared/ui-web";
import { ModelProps } from "@shared/util-client";
import { gql, slice, st } from "@social/data-access";

export const ActionLogItem = ({
  className,
  actionLog,
  slice = st.slice.actionLog,
  actions,
  columns,
}: ModelProps<slice.ActionLogSlice, gql.LightActionLog>) => {
  return (
    <DataItem
      className={className}
      title={`${actionLog.id}`}
      model={actionLog}
      slice={slice}
      actions={actions}
      columns={columns}
    />
  );
};
