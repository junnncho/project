import * as Quest from ".";
import { DataListContainer } from "@shared/ui-web";
import { ModelsProps } from "@shared/util-client";
import { QuestItem } from "./Quest.Item";
import { gql, slice, st } from "../../stores";
import { useRouter } from "next/navigation";

export const QuestList = ({ slice = st.slice.quest, init }: ModelsProps<slice.QuestSlice, gql.Quest>) => {
  const router = useRouter();
  return (
    <DataListContainer
      init={init}
      slice={slice}
      renderItem={Quest.Item}
      renderDashboard={Quest.Stat}
      queryMap={gql.questQueryMap}
      edit={
        // <DataEditModal slice={slice} renderTitle={(quest: DefaultOf<gql.Quest>) => `${quest.field}`}>
        <Quest.Edit slice={slice} />
        // </DataEditModal>
      }
      type="list"
      columns={["type", { key: "field", render: (field: string) => <span>{field}</span> }, "status", "createdAt"]}
      actions={(quest: gql.LightQuest, idx) => [
        "remove",
        "edit",
        {
          type: "approve",
          render: () => <Quest.Action.Approve id={quest.id} slice={slice} />,
        },
      ]}
    />
  );
};

const QuestListInSelf = ({
  questList,
  slice = st.slice.quest,
}: {
  questList: gql.LightQuest[];
  slice: slice.QuestSlice;
}) => {
  const router = useRouter();
  return (
    <>
      {questList.map((quest, index) => (
        <QuestItem.InSelf onClick={() => router.push(`/quest/${quest.id}`)} key={index} quest={quest} slice={slice} />
      ))}
    </>
  );
};
QuestList.InSelf = QuestListInSelf;
