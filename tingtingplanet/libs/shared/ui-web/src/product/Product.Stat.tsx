import { DataDashboard } from "@shared/ui-web";
import { ModelDashboardProps } from "@shared/util-client";
import { gql, slice, st } from "@shared/data-access";

export const ProductStat = ({
  className,
  summary,
  slice = st.slice.product,
  queryMap = gql.productQueryMap,
  hidePresents,
}: ModelDashboardProps<slice.ProductSlice, gql.ProductSummary>) => {
  return (
    <DataDashboard
      className={className}
      summary={summary}
      slice={slice}
      queryMap={queryMap}
      columns={["totalProduct"]}
      hidePresents={hidePresents}
    />
  );
};
