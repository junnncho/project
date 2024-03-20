import { Quest } from "@localjobs/frontend/components";
import { st } from "@localjobs/frontend/stores";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ViewQuest() {
  const params = useSearchParams();
  const questId = params.get("questId");
  const quest = st.use.quest();
  const questVerify = st.use.questVerifyList();
  const self = st.use.self();
  useEffect(() => {
    if (questId) {
      st.do.viewQuest(questId as string);
      st.do.initQuestVerify({ query: { quest: questId, ...(!self.roles.includes("admin") && { user: self.id }) } });
    }
  }, [questId]);
  return (
    <>
      {quest === "loading" || questId !== quest.id ? (
        <Quest.Loading />
      ) : self.roles.includes("admin") ? (
        <Quest.View.InAdmin quest={quest} questVerify={questVerify} key={"inemployer" + questId} />
      ) : (
        <Quest.View.InSelf quest={quest} questVerify={questVerify} key={"inself" + questId} />
      )}
    </>
  );
}
