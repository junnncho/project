import { gql, slice, st } from "../../stores";
import { parsePhone } from "../Common";
import Image from "next/image";
import { BiFemale, BiMale, BiPlus } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { Action } from ".";

const Ubin = (tour: gql.LightTour) => {
  const point = (tour.totalMaleReserver + tour.totalFemaleReserver) / (tour.maxMaleReserver + tour.maxFemaleReserver);
  if (point > 0.7) {
    return <div className=" text-white bg-red-500 px-2 text-2xl">마감임박</div>;
  } else {
    return <></>;
  }
};

export const TourItem = ({
  className,
  tour,
  slice = st.slice.tour,
  onClick,
}: {
  className?: string;
  tour: gql.LightTour;
  slice?: slice.TourSlice;
  onClick?: () => void;
}) => {
  return (
    <div className=" w-full " onClick={onClick}>
      <div className=" pt-2 flex">
        <div className="relative min-w-max rounded-lg overflow-hidden h-[100px]">
          <Image
            alt="thmb"
            src={
              tour.thumbnails && Array.isArray(tour.thumbnails) && tour.thumbnails[0]
                ? tour.thumbnails[0]?.url
                : "/neverAsk.png"
            }
            width={100}
            height={100}
            className=" object-cover"
          />
        </div>
        <div className="w-full">
          <div className="font-bold text-xl ml-2">{tour.name}</div>
          <div className="w-full mt-1">
            <div className="ml-2 flex">
              <div className="min-w-16 w-16 flex flex-wrap">출발지역:</div>
              <div className="flex flex-wrap gap-1 self-center ml-1 flex-1">
                {tour.departPlace.map((departPlace) => (
                  <div className="font-bold badge text-base text-white badge-primary">
                    {departPlace[0] + " " + departPlace[1]}
                  </div>
                ))}
              </div>
            </div>
            <div className="ml-2">
              목적지:
              <span className="font-bold ml-1">{tour.place}</span>
            </div>
            <div className="ml-2">
              출발날짜: <span className="font-bold ml-1">{tour.departAt.format("YYYY년 MM월 DD일 ")}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center text-base">
        <div className="text-base text-gray-500 font-semibold">{`회비: ${tour.dues.toLocaleString()}원`}</div>
        <div className="ml-auto flex items-center">{Ubin(tour)}</div>
      </div>
    </div>
  );
};

const TourItemInSelf = ({
  className,
  tour,
  slice = st.slice.tour,
  onClick,
}: {
  className?: string;
  tour: gql.LightTour;
  slice?: slice.TourSlice;
  onClick?: () => void;
}) => {
  return (
    <div className="px-2 w-full ">
      <div className="border-b border-secondary">
        <TourItem className={className} tour={tour} slice={slice} onClick={onClick} />
        <div className="flex w-full justify-around">
          <Action.Inquiry tour={tour} className="btn text-xl w-2/5 my-2 btn-neutral" />
          <button onClick={onClick} className="btn text-xl w-2/5 my-2 btn-neutral ">
            상세보기
          </button>
        </div>
      </div>
    </div>
  );
};
TourItem.InSelf = TourItemInSelf;
const TourItemInDriver = ({
  className,
  tour,
  slice = st.slice.tour,
  onClick,
}: {
  className?: string;
  tour: gql.LightTour;
  slice?: slice.TourSlice;
  onClick?: () => void;
}) => {
  return (
    <div className="px-2 w-full ">
      <div className="border-b border-secondary">
        <TourItem className={className} tour={tour} slice={slice} onClick={onClick} />
      </div>
    </div>
  );
};
TourItem.InDriver = TourItemInDriver;

const TourItemInNew = ({ url }: { url: string }) => {
  const router = useRouter();
  return (
    <div className="px-2 mb-2">
      <button
        className=" text-center content-center w-full py-6 btn rounded-lg border-dashed border-primary"
        onClick={() => router.push(url)}
      >
        <BiPlus size={4} className="mr-2" /> <div className=" text-2xl">새 여행 생성</div>
      </button>
    </div>
  );
};
TourItem.InNew = TourItemInNew;
