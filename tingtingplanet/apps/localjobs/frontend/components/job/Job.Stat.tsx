import { DataDashboard } from "@shared/ui-web";
import { ModelDashboardProps } from "@shared/util-client";
import { gql, slice, st } from "../../stores";

export const JobStat = ({
  className,
  summary,
  slice = st.slice.job,
  queryMap = gql.jobQueryMap,
  hidePresents,
}: ModelDashboardProps<slice.JobSlice, gql.JobSummary>) => {
  return (
    <DataDashboard
      className={className}
      summary={summary}
      slice={slice}
      queryMap={queryMap}
      columns={["totalJob"]}
      hidePresents={hidePresents}
    />
  );
};
