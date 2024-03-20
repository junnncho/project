import { Tour } from "@seniorlove/frontend/components";
import { st } from "@seniorlove/frontend/stores";
import { useEffect } from "react";

export default function TourList() {
  const tourList = st.use.tourList();
  const self = st.use.self();

  useEffect(() => {
    st.do.initTour({ sort: { departAt: -1 } });
  }, []);
  return (
    <>{tourList === "loading" ? <Tour.Loading /> : <Tour.List.InSelf tourList={tourList} slice={st.slice.tour} />}</>
  );
}
