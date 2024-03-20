import { DataDashboard } from "@shared/ui-web";
import { ModelDashboardProps } from "@shared/util-client";
import { gql, slice, st } from "@social/data-access";

export const ActionLogStat = ({
  className,
  summary,
  slice = st.slice.actionLog,
  queryMap = gql.actionLogQueryMap,
  hidePresents,
}: ModelDashboardProps<slice.ActionLogSlice, gql.ActionLogSummary>) => {
  return (
    <DataDashboard
      className={className}
      summary={summary}
      slice={slice}
      queryMap={queryMap}
      columns={["totalActionLog"]}
      hidePresents={hidePresents}
    />
  );
};
