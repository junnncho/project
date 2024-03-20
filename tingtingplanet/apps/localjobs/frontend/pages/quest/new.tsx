import { DataEditModal } from "@shared/ui-web";
import { DefaultOf } from "@shared/util-client";
import { Quest } from "@localjobs/frontend/components";
import { gql, st } from "@localjobs/frontend/stores";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NewQuest() {
  const self = st.use.self();
  const router = useRouter();
  return <Quest.Edit.InAdmin slice={st.slice.questinAdmin} />;
}
