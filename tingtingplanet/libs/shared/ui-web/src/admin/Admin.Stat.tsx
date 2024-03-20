import { DataDashboard } from "@shared/ui-web";
import { ModelDashboardProps } from "@shared/util-client";
import { gql, slice, st } from "@shared/data-access";

export const AdminStat = ({
  className,
  summary,
  slice = st.slice.admin,
  queryMap = gql.adminQueryMap,
  hidePresents,
}: ModelDashboardProps<slice.AdminSlice, gql.AdminSummary>) => {
  return (
    <DataDashboard
      className={className}
      summary={summary}
      slice={slice}
      queryMap={queryMap}
      columns={["totalAdmin"]}
      hidePresents={hidePresents}
    />
  );
};
