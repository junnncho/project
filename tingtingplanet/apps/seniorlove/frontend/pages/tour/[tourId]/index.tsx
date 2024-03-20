import { Tour } from "@seniorlove/frontend/components";
import { st } from "@seniorlove/frontend/stores";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function ViewTour() {
  const params = useSearchParams();
  const tourId = params.get("tourId");
  const tour = st.use.tour();
  const self = st.use.self();
  useEffect(() => {
    if (tourId) {
      st.do.viewTour(tourId as string);
    }
  }, [tourId]);
  return (
    <>
      {tour === "loading" || tourId !== tour.id ? (
        <Tour.Loading />
      ) : tour.driver.id === self.id ? (
        <Tour.View.InDriver tour={tour} key={"indriver" + tourId} />
      ) : (
        <Tour.View.InSelf tour={tour} key={"inself" + tourId} />
      )}
    </>
  );
}
