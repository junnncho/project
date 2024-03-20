import { Job } from "@localjobs/frontend/components";
import { st } from "@localjobs/frontend/stores";
import { useEffect } from "react";

export default function JobList() {
  const jobList = st.use.jobListinEmployer();
  const self = st.use.self();

  useEffect(() => {
    st.do.initJobinEmployer({ query: { employer: self.id }, sort: { departAt: -1 } });
  }, []);
  return (
    <>
      <div className="w-full py-4">
        {jobList === "loading" ? <Job.Loading /> : <Job.List.InEmployer jobList={jobList} slice={st.slice.job} />}
      </div>
    </>
  );
}
