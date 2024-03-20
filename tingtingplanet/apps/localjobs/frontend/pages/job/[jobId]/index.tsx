import { Job } from "@localjobs/frontend/components";
import { st } from "@localjobs/frontend/stores";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ViewJob() {
  const params = useSearchParams();
  const jobId = params.get("jobId");
  const job = st.use.job();
  const self = st.use.self();
  useEffect(() => {
    if (jobId) {
      st.do.viewJob(jobId as string);
    }
  }, [jobId]);
  return (
    <>
      {job === "loading" || jobId !== job.id ? (
        <Job.Loading />
      ) : job.employer.id === self.id ? (
        <Job.View.InEmployer job={job} key={"inemployer" + jobId} />
      ) : (
        <Job.View.InSelf job={job} key={"inself" + jobId} />
      )}
    </>
  );
}
