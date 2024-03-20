import { DataDashboard } from "@shared/ui-web";
import { ModelDashboardProps } from "@shared/util-client";
import { gql, slice, st } from "@shared/data-access";

export const CurrencyStat = ({
  className,
  summary,
  slice = st.slice.currency,
  queryMap = gql.currencyQueryMap,
  hidePresents,
}: ModelDashboardProps<slice.CurrencySlice, gql.CurrencySummary>) => {
  return (
    <DataDashboard
      className={className}
      summary={summary}
      slice={slice}
      queryMap={queryMap}
      columns={["totalCurrency"]}
      hidePresents={hidePresents}
    />
  );
};
