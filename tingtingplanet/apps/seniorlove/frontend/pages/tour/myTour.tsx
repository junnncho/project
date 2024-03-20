import { Tour } from "@seniorlove/frontend/components";
import { st } from "@seniorlove/frontend/stores";
import { useEffect } from "react";

export default function TourList() {
  const tourListInApply = st.use.tourListInApply();
  const tourListInReserve = st.use.tourListInReserve();
  const self = st.use.self();
  const gender = self.gender;

  useEffect(() => {
    st.do.initTourInApply({ query: { [`${gender}Applicants`]: self.id }, sort: { departAt: -1 } });
    st.do.initTourInReserve({ query: { [`${gender}Reservers`]: self.id }, sort: { departAt: -1 } });
  }, []);
  return (
    <>
      <div className=" w-full border-y border-secondary py-4 font-semibold text-xl">
        <div>예약 확정내역</div>
      </div>
      {tourListInReserve === "loading" ? (
        <Tour.Loading />
      ) : (
        <Tour.List.InSelf tourList={tourListInReserve} slice={st.slice.tourInReserve} />
      )}
      <div className=" w-full border-b border-secondary py-4 font-semibold text-xl">
        <div>예약 신청내역</div>
      </div>
      {tourListInApply === "loading" ? (
        <Tour.Loading />
      ) : (
        <Tour.List.InSelf tourList={tourListInApply} slice={st.slice.tourInApply} />
      )}
    </>
  );
}
