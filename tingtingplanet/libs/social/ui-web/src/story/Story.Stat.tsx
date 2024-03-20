import { DataDashboard } from "@shared/ui-web";
import { ModelDashboardProps } from "@shared/util-client";
import { gql, slice, st } from "@social/data-access";

export const StoryStat = ({
  className,
  summary,
  slice = st.slice.story,
  queryMap = gql.storyQueryMap,
  hidePresents,
}: ModelDashboardProps<slice.StorySlice, gql.StorySummary>) => {
  return (
    <DataDashboard
      summary={summary}
      slice={slice}
      queryMap={queryMap}
      columns={["totalStory", "activeStory", "approvedStory", "deniedStory"]}
      presents={["haStory", "daStory", "waStory", "maStory"]}
      hidePresents={hidePresents}
    />
  );
};
