import { Tour } from "@seniorlove/frontend/components";
import { st } from "@seniorlove/frontend/stores";
import { useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";

export default function ViewTour() {
  const tourId = useSearchParams().get("tourId") as string;
  const tour = st.use.tour();
  useEffect(() => {
    if (!tourId) return;
    st.do.viewTour(tourId);
  }, [tourId]);
  return (
    <>
      {tour === "loading" || tourId !== tour.id ? (
        <Tour.Loading />
      ) : (
        <Tour.View.InDriver tour={tour} key={"indriver" + tourId} />
      )}
    </>
  );
}
