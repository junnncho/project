import { DataEditModal } from "@shared/ui-web";
import { DefaultOf } from "@shared/util-client";
import { Job } from "@localjobs/frontend/components";
import { gql, st } from "@localjobs/frontend/stores";
import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function EditJobInEmployer() {
  const params = useSearchParams();
  const id = params.get("jobId") as string;
  const jobForm = st.use.jobForm();
  const router = useRouter();

  useEffect(() => {
    st.do.editJobinEmployer(id);
  }, []);
  return <Job.Edit.InEmployer slice={st.slice.jobinEmployer} />;
}
