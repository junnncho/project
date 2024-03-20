import { DataDashboard } from "@shared/ui-web";
import { ModelDashboardProps } from "@shared/util-client";
import { gql, slice, st } from "@shared/data-access";

export const ThingStat = ({
  className,
  summary,
  slice = st.slice.thing,
  queryMap = gql.thingQueryMap,
  hidePresents,
}: ModelDashboardProps<slice.ThingSlice, gql.ThingSummary>) => {
  return (
    <DataDashboard
      className={className}
      summary={summary}
      slice={slice}
      queryMap={queryMap}
      columns={["totalThing"]}
      hidePresents={hidePresents}
    />
  );
};
