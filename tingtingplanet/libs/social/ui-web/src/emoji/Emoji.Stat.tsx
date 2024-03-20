import { DataDashboard } from "@shared/ui-web";
import { ModelDashboardProps } from "@shared/util-client";
import { gql, slice, st } from "@social/data-access";

export const EmojiStat = ({
  className,
  summary,
  slice = st.slice.emoji,
  queryMap = gql.emojiQueryMap,
  hidePresents,
}: ModelDashboardProps<slice.EmojiSlice, gql.EmojiSummary>) => {
  return (
    <DataDashboard
      className={className}
      summary={summary}
      slice={slice}
      queryMap={queryMap}
      columns={["totalEmoji"]}
      hidePresents={hidePresents}
    />
  );
};
