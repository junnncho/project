import { DataDashboard } from "@shared/ui-web";
import { ModelDashboardProps } from "@shared/util-client";
import { gql, slice, st } from "@shared/data-access";

export const NotificationStat = ({
  className,
  summary,
  slice = st.slice.notification,
  queryMap = gql.notificationQueryMap,
  hidePresents,
}: ModelDashboardProps<slice.NotificationSlice, gql.NotificationSummary>) => {
  return (
    <DataDashboard
      className={className}
      summary={summary}
      slice={slice}
      queryMap={queryMap}
      columns={["totalNotification"]}
      hidePresents={hidePresents}
    />
  );
};
