import { DataDashboard } from "@shared/ui-web";
import { ModelDashboardProps } from "@shared/util-client";
import { gql, slice, st } from "@social/data-access";

export const ChatRoomStat = ({
  className,
  summary,
  slice = st.slice.chatRoom,
  queryMap = gql.chatRoomQueryMap,
  hidePresents,
}: ModelDashboardProps<slice.ChatRoomSlice, gql.ChatRoomSummary>) => {
  return (
    <DataDashboard
      className={className}
      summary={summary}
      slice={slice}
      queryMap={queryMap}
      columns={["totalChatRoom"]}
      hidePresents={hidePresents}
    />
  );
};
