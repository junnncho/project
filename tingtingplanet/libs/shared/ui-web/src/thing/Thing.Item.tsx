import { DataItem } from "@shared/ui-web";
import { ModelProps } from "@shared/util-client";
import { gql, slice, st } from "@shared/data-access";

export const ThingItem = ({
  className,
  thing,
  slice = st.slice.thing,
  actions,
  columns,
}: ModelProps<slice.ThingSlice, gql.LightThing>) => {
  return (
    <DataItem
      className={className}
      title={`${thing.name}`}
      model={thing}
      slice={slice}
      actions={actions}
      columns={columns}
    />
  );
};
