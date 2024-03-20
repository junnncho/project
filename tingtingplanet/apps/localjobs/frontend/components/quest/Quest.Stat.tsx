import { DataDashboard } from "@shared/ui-web";
import { ModelDashboardProps } from "@shared/util-client";
import { gql, slice, st } from "../../stores";

export const QuestStat = ({
  className,
  summary,
  slice = st.slice.quest,
  queryMap = gql.questQueryMap,
  hidePresents,
}: ModelDashboardProps<slice.QuestSlice, gql.QuestSummary>) => {
  return (
    <DataDashboard
      className={className}
      summary={summary}
      slice={slice}
      queryMap={queryMap}
      columns={["totalQuest"]}
      hidePresents={hidePresents}
    />
  );
};
