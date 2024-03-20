import { DataDashboard } from "@shared/ui-web";
import { ModelDashboardProps } from "@shared/util-client";
import { gql, slice, st } from "@social/data-access";

export const ReportStat = ({
  summary,
  slice = st.slice.report,
  queryMap = gql.reportQueryMap,
  hidePresents,
}: ModelDashboardProps<slice.ReportSlice, gql.ReportSummary>) => {
  return (
    <DataDashboard
      summary={summary}
      slice={slice}
      queryMap={queryMap}
      columns={["totalReport", "activeReport", "inProgressReport", "resolvedReport"]}
      hidePresents={hidePresents}
    />
  );
};
