import { DataDashboard } from "@shared/ui-web";
import { ModelDashboardProps } from "@shared/util-client";
import { gql, slice, st } from "@social/data-access";

export const ChatBoardStat = ({
  className,
  summary,
  slice = st.slice.chatBoard,
  queryMap = gql.chatBoardQueryMap,
  hidePresents,
}: ModelDashboardProps<slice.ChatBoardSlice, gql.ChatBoardSummary>) => {
  return (
    <DataDashboard
      className={className}
      summary={summary}
      slice={slice}
      queryMap={queryMap}
      columns={["totalChatBoard"]}
      hidePresents={hidePresents}
    />
  );
};
