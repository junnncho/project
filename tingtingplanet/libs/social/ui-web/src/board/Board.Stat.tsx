import { DataDashboard } from "@shared/ui-web";
import { ModelDashboardProps } from "@shared/util-client";
import { gql, slice, st } from "@social/data-access";

export const BoardStat = ({
  className,
  summary,
  slice = st.slice.board,
  queryMap = gql.boardQueryMap,
  hidePresents,
}: ModelDashboardProps<slice.BoardSlice, gql.BoardSummary>) => {
  return (
    <DataDashboard
      className={className}
      summary={summary}
      slice={slice}
      queryMap={queryMap}
      columns={["totalBoard"]}
      hidePresents={hidePresents}
    />
  );
};
