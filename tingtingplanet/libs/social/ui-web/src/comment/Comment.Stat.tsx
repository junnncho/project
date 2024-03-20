import { DataDashboard } from "@shared/ui-web";
import { ModelDashboardProps } from "@shared/util-client";
import { gql, slice, st } from "@social/data-access";

export const CommentStat = ({
  className,
  summary,
  slice = st.slice.comment,
  queryMap = gql.commentQueryMap,
  hidePresents,
}: ModelDashboardProps<slice.CommentSlice, gql.CommentSummary>) => {
  return (
    <DataDashboard
      summary={summary}
      slice={slice}
      queryMap={queryMap}
      columns={["totalComment", "activeComment", "approvedComment", "deniedComment"]}
      presents={["haComment", "daComment", "waComment", "maComment"]}
      hidePresents={hidePresents}
    />
  );
};
