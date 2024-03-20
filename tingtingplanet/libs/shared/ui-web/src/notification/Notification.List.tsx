import * as Notification from ".";
import { DataEditModal, DataListContainer } from "@shared/ui-web";
import { DefaultOf, ModelsProps } from "@shared/util-client";
import { gql, slice, st } from "@shared/data-access";

export const NotificationList = ({
  slice = st.slice.notification,
  init,
}: ModelsProps<slice.NotificationSlice, gql.Notification>) => {
  return (
    <DataListContainer
      init={init}
      slice={slice}
      renderItem={Notification.Item}
      renderDashboard={Notification.Stat}
      queryMap={gql.notificationQueryMap}
      edit={
        <DataEditModal slice={slice} renderTitle={(notification: DefaultOf<gql.Notification>) => `${notification.id}`}>
          <Notification.Edit slice={slice} />
        </DataEditModal>
      }
      type="list"
      columns={["status", "createdAt"]}
      actions={(notification: gql.LightNotification, idx) => [
        "remove",
        "edit",
        {
          type: "approve",
          render: () => <Notification.Action.Approve notification={notification} idx={idx} slice={slice} />,
        },
      ]}
    />
  );
};
