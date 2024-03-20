import { DataDashboard } from "@shared/ui-web";
import { ModelDashboardProps } from "@shared/util-client";
import { gql, slice, st } from "../../stores";

export const TourStat = ({
  className,
  summary,
  slice = st.slice.tour,
  queryMap = gql.tourQueryMap,
  hidePresents,
}: ModelDashboardProps<slice.TourSlice, gql.TourSummary>) => {
  return (
    <DataDashboard
      className={className}
      summary={summary}
      slice={slice}
      queryMap={queryMap}
      columns={["totalTour"]}
      hidePresents={hidePresents}
    />
  );
};
