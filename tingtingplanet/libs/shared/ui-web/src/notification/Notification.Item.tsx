import { DataItem } from "@shared/ui-web";
import { ModelProps } from "@shared/util-client";
import { gql, slice, st } from "@shared/data-access";

export const NotificationItem = ({
  className,
  notification,
  slice = st.slice.notification,
  actions,
  columns,
}: ModelProps<slice.NotificationSlice, gql.LightNotification>) => {
  return (
    <DataItem
      className={className}
      title={`${notification.id}`}
      model={notification}
      slice={slice}
      actions={actions}
      columns={columns}
    />
  );
};
