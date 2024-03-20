import { Job } from "@localjobs/frontend/components";
import { st } from "@localjobs/frontend/stores";
import { useEffect } from "react";

export default function JobList() {
  const jobListInApply = st.use.jobListInApply();
  const jobListInReserve = st.use.jobListInReserve();
  const self = st.use.self();
  const gender = self.gender;

  useEffect(() => {
    st.do.initJobInApply({ query: { [`${gender}Applicants`]: self.id }, sort: { departAt: -1 } });
    st.do.initJobInReserve({ query: { [`${gender}Reservers`]: self.id }, sort: { departAt: -1 } });
  }, []);
  return (
    <>
      <div className=" w-full border-y border-secondary py-4 font-semibold text-xl">
        <div>예약 확정내역</div>
      </div>
      {jobListInReserve === "loading" ? (
        <Job.Loading />
      ) : (
        <Job.List.InSelf jobList={jobListInReserve} slice={st.slice.jobInReserve} />
      )}
      <div className=" w-full border-b border-secondary py-4 font-semibold text-xl">
        <div>예약 신청내역</div>
      </div>
      {jobListInApply === "loading" ? (
        <Job.Loading />
      ) : (
        <Job.List.InSelf jobList={jobListInApply} slice={st.slice.jobInApply} />
      )}
    </>
  );
}
