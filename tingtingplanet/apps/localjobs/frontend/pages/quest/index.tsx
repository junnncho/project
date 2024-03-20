import { Quest } from "@localjobs/frontend/components";
import { st } from "@localjobs/frontend/stores";
import { useEffect } from "react";

export default function QuestList() {
  const questList = st.use.questList();
  const self = st.use.self();

  useEffect(() => {
    st.do.initQuest({ sort: { departAt: -1 } });
  }, []);
  return (
    <div className="py-4">
      {self.roles.includes("admin") && <Quest.Item.InNew url="/quest/new" />}
      {questList === "loading" ? <Quest.Loading /> : <Quest.List.InSelf questList={questList} slice={st.slice.quest} />}
    </div>
  );
}
