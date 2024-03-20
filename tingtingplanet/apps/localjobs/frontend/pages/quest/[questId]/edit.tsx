import { DataEditModal } from "@shared/ui-web";
import { DefaultOf } from "@shared/util-client";
import { Quest } from "@localjobs/frontend/components";
import { gql, st } from "@localjobs/frontend/stores";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function EditQuestInEmployer() {
  const params = useSearchParams();
  const id = params.get("questId") as string;
  const questForm = st.use.questForm();
  const router = useRouter();

  useEffect(() => {
    st.do.editQuestinAdmin(id);
  }, []);
  return <Quest.Edit.InAdmin slice={st.slice.questinAdmin} />;
}
