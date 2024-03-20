import * as Tour from ".";
import { DataListContainer } from "@shared/ui-web";
import { ModelsProps } from "@shared/util-client";
import { TourItem } from "./Tour.Item";
import { gql, slice, st } from "../../stores";
import { useRouter } from "next/navigation";

export const TourList = ({ slice = st.slice.tour, init }: ModelsProps<slice.TourSlice, gql.Tour>) => {
  const router = useRouter();
  return (
    <DataListContainer
      init={init}
      slice={slice}
      renderItem={Tour.Item}
      renderDashboard={Tour.Stat}
      queryMap={gql.tourQueryMap}
      edit={
        // <DataEditModal slice={slice} renderTitle={(tour: DefaultOf<gql.Tour>) => `${tour.field}`}>
        <Tour.Edit slice={slice} />
        // </DataEditModal>
      }
      type="list"
      columns={["type", { key: "field", render: (field: string) => <span>{field}</span> }, "status", "createdAt"]}
      actions={(tour: gql.LightTour, idx) => [
        "remove",
        "edit",
        {
          type: "approve",
          render: () => <Tour.Action.Approve tour={tour} idx={idx} slice={slice} />,
        },
      ]}
    />
  );
};

const TourListInSelf = ({ tourList, slice = st.slice.tour }: { tourList: gql.LightTour[]; slice: slice.TourSlice }) => {
  const router = useRouter();
  return (
    <>
      {tourList.map((tour, index) => (
        <TourItem.InSelf onClick={() => router.push(`/tour/${tour.id}`)} key={index} tour={tour} slice={slice} />
      ))}
    </>
  );
};
TourList.InSelf = TourListInSelf;

const TourListInDriver = ({
  tourList,
  slice = st.slice.tour,
}: {
  tourList: gql.LightTour[];
  slice: slice.TourSlice;
}) => {
  const router = useRouter();
  return (
    <>
      <Tour.Item.InNew url="/driver/tour/new" />
      {tourList.map((tour, index) => (
        <TourItem.InDriver
          onClick={() => router.push(`/driver/tour/${tour.id}`)}
          key={index}
          tour={tour}
          slice={slice}
        />
      ))}
    </>
  );
};
TourList.InDriver = TourListInDriver;
