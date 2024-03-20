import { Job } from "@localjobs/frontend/components";
import { st } from "@localjobs/frontend/stores";
import { useEffect } from "react";

export default function JobList() {
  const jobList = st.use.jobList();
  const self = st.use.self();

  useEffect(() => {
    st.do.initJob({ sort: { departAt: -1 } });
  }, []);
  return <>{jobList === "loading" ? <Job.Loading /> : <Job.List.InSelf jobList={jobList} slice={st.slice.job} />}</>;
}
