import { DataDashboard } from "@shared/ui-web";
import { ModelDashboardProps } from "@shared/util-client";
import { gql, slice, st } from "@social/data-access";

export const ServiceDeskStat = ({
  className,
  summary,
  slice = st.slice.serviceDesk,
  queryMap = gql.serviceDeskQueryMap,
  hidePresents,
}: ModelDashboardProps<slice.ServiceDeskSlice, gql.ServiceDeskSummary>) => {
  return (
    <DataDashboard
      className={className}
      summary={summary}
      slice={slice}
      queryMap={queryMap}
      columns={["totalServiceDesk"]}
      hidePresents={hidePresents}
    />
  );
};
