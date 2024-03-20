import { gql, slice, st } from "../../stores";
import { parsePhone } from "../Common";
import Image from "next/image";
import { BiFemale, BiMale, BiPlus } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { Action } from ".";

const Ubin = (job: gql.LightJob) => {
  const point = (job.totalMaleReserver + job.totalFemaleReserver) / (job.maxMaleReserver + job.maxFemaleReserver);
  if (point > 0.7) {
    return <div className=" text-white bg-red-500 px-2 text-2xl">마감임박</div>;
  } else {
    return <></>;
  }
};

export const JobItem = ({
  className,
  job,
  slice = st.slice.job,
  onClick,
}: {
  className?: string;
  job: gql.Job;
  slice?: slice.JobSlice;
  onClick?: () => void;
}) => {
  return (
    <div className=" w-full rounded-lg bg-white shadow-sm mt-3 font-normal text-sm" onClick={onClick}>
      <div className="flex">
        <div className="relative min-w-max rounded-l-lg  overflow-hidden h-[100px]">
          <Image
            alt="thmb"
            src={
              job.thumbnails && Array.isArray(job.thumbnails) && job.thumbnails[0]
                ? job.thumbnails[0]?.url
                : "/job.jpeg"
            }
            width={60}
            height={120}
            className=" object-cover"
          />
        </div>
        <div className="w-full pl-2 py-3">
          <div className="flex justify-between">
            <span className="font-bold text-xl ml-2">{job.name}</span>
            <div className="font-base mr-1 p-3 badge text-base text-white badge-primary">모집 중</div>
          </div>

          <div className="w-full mt-1">
            <div className="ml-2 flex">
              <div className=" font-normal">
                월 급여 <b className="font-semibold m-2">{job.pay.toLocaleString()}원</b>
              </div>
              <div className="ml-8">
                모집분야
                <b className="font-semibold ml-2">{job.kind}</b>
              </div>
            </div>

            <div className="ml-2">
              마감기한 <b className="font-semibold ml-2 ">{job.due.format("YYYY년 MM월 DD일 ")}</b>
            </div>
            <div className="flex justify-between mx-5 mt-2">
              <div className="badge badge-secondary">{job.term}개월</div>
              <div className="badge badge-secondary">성실도 {job.point} 이상</div>
              <div className=" text-gray-400">{job.totalFemaleApplicant + job.totalMaleApplicant}명 지원</div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="flex items-center text-base">
        <div className="text-base text-gray-500 font-semibold">{`성실도: ${job.point.toLocaleString()}이상`}</div>
        <div className="ml-auto flex items-center">{Ubin(job)}</div>
      </div> */}
    </div>
  );
};

const JobItemInSelf = ({
  className,
  job,
  slice = st.slice.job,
  onClick,
}: {
  className?: string;
  job: gql.Job;
  slice?: slice.JobSlice;
  onClick?: () => void;
}) => {
  return (
    <div className="px-2 w-full">
      <div className="border-b border-secondary">
        <JobItem className={className} job={job} slice={slice} onClick={onClick} />
      </div>
    </div>
  );
};
JobItem.InSelf = JobItemInSelf;
const JobItemInEmployer = ({
  className,
  job,
  slice = st.slice.job,
  onClick,
}: {
  className?: string;
  job: gql.Job;
  slice?: slice.JobSlice;
  onClick?: () => void;
}) => {
  return (
    <div className="px-2 w-full ">
      <div className="border-b border-secondary">
        <JobItem className={className} job={job} slice={slice} onClick={onClick} />
      </div>
    </div>
  );
};
JobItem.InEmployer = JobItemInEmployer;

const JobItemInNew = ({ url }: { url: string }) => {
  const router = useRouter();
  return (
    <div className="flex flex-row-reverse">
      <button
        className="text-center min-h-0 py-4 content-center btn rounded-lg mr-2 h-0"
        onClick={() => router.push(url)}
      >
        <BiPlus size={10} className="text-white" />
        <div className=" font-normal text-white text-sm ">모집하기</div>
      </button>
    </div>
  );
};
JobItem.InNew = JobItemInNew;
