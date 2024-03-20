import { Job } from "@localjobs/frontend/components";
import { st } from "@localjobs/frontend/stores";
import { useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

export default function ViewJob() {
  const jobId = useSearchParams().get("jobId") as string;
  const job = st.use.job();
  useEffect(() => {
    if (!jobId) return;
    st.do.viewJob(jobId);
  }, [jobId]);
  return (
    <>
      {job === "loading" || jobId !== job.id ? (
        <Job.Loading />
      ) : (
        <Job.View.InEmployer job={job} key={"inemployer" + jobId} />
      )}
    </>
  );
}
