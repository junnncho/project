import { DataItem } from "@shared/ui-web";
import { ModelProps } from "@shared/util-client";
import { gql, slice, st } from "@social/data-access";

export const GroupCallItem = ({
  className,
  groupCall,
  slice = st.slice.groupCall,
  actions,
  columns,
}: ModelProps<slice.GroupCallSlice, gql.LightGroupCall>) => {
  return (
    <DataItem
      className={className}
      title={`${groupCall.id}`}
      model={groupCall}
      slice={slice}
      actions={actions}
      columns={columns}
    />
  );
};
