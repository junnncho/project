import { DataEditModal } from "@shared/ui-web";
import { DefaultOf } from "@shared/util-client";
import { Job } from "@localjobs/frontend/components";
import { gql, st } from "@localjobs/frontend/stores";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NewJob() {
  const self = st.use.self();
  const router = useRouter();
  useEffect(() => {
    st.do.newJobinEmployer({ employer: self });
  }, []);
  return <Job.Edit.InEmployer slice={st.slice.jobinEmployer} />;
}
