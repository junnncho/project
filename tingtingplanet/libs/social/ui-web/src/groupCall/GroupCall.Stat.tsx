import { DataDashboard } from "@shared/ui-web";
import { ModelDashboardProps } from "@shared/util-client";
import { gql, slice, st } from "@social/data-access";

export const GroupCallStat = ({
  className,
  summary,
  slice = st.slice.groupCall,
  queryMap = gql.groupCallQueryMap,
  hidePresents,
}: ModelDashboardProps<slice.GroupCallSlice, gql.GroupCallSummary>) => {
  return (
    <DataDashboard
      className={className}
      summary={summary}
      slice={slice}
      queryMap={queryMap}
      columns={["totalGroupCall"]}
      hidePresents={hidePresents}
    />
  );
};
