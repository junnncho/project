import { Tour } from "@seniorlove/frontend/components";
import { st } from "@seniorlove/frontend/stores";
import { useEffect } from "react";

export default function TourList() {
  const tourList = st.use.tourListinDriver();
  const self = st.use.self();

  useEffect(() => {
    st.do.initTourinDriver({ query: { driver: self.id }, sort: { departAt: -1 } });
  }, []);
  return (
    <>
      <div className="w-full py-4">
        {tourList === "loading" ? <Tour.Loading /> : <Tour.List.InDriver tourList={tourList} slice={st.slice.tour} />}
      </div>
    </>
  );
}
