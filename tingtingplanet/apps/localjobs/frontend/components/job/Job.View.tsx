import { Action } from ".";
import { BiFemale, BiMale } from "react-icons/bi";
import { Job } from "..";
import { UserApplyItem, parsePhone } from "../Common";
import { Utils } from "@shared/util";
import { customStore } from "@localjobs/frontend/stores/store";
import { gql, slice, st } from "../../stores";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import { AiFillCloseCircle } from "react-icons/ai";
import { Modal, Skeleton } from "@shared/ui-web";
import { BsFillChatDotsFill } from "react-icons/bs";

const calcAge = (ages: number[]) => {
  if (ages.length === 0) return 0;
  const average = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length;
  return Math.floor(average(ages));
};

interface JobViewProps {
  className?: string;
  job: gql.Job;
  slice?: slice.JobSlice;
  onChat?: () => void;
}
// View를 작성하세요. 텍스트는 locale을 등록하여 사용하고, 내부 구현은 자유롭게 진행합니다.
export const JobView = ({ className, job, slice = st.slice.job, onChat }: JobViewProps) => {
  const self = st.use.self();
  const store = customStore();
  const router = useRouter();
  const isApply =
    job.maleApplicants.some((user) => user.id === self.id) || job.femaleApplicants.some((user) => user.id === self.id);
  const isReserve =
    job.maleReservers.some((user) => user.id === self.id) || job.femaleReservers.some((user) => user.id === self.id);
  const isEmployer = job.employer.id === self.id;
  const [page, setPage] = useState<number>(1);
  const [applyView, setApplyView] = useState<boolean>(true);
  const [reserveView, setReserveView] = useState<boolean>(true);

  return (
    <>
      <div className="sticky top-20 left-0 px-4 z-50 w-full">
        {isApply
          ? applyView && (
              <>
                <AiFillCloseCircle
                  size={20}
                  className="absolute top-2 right-6"
                  opacity={0.6}
                  onClick={() => setApplyView(false)}
                />
                <div className=" alert alert-success gap-0 mb-4">
                  <div>상태: 신청완료 </div>
                  <div className="text-sm mt-0"> 구인자가 승인하면 취업이 완료됩니다.</div>
                </div>
              </>
            )
          : isReserve
          ? reserveView && (
              <>
                <AiFillCloseCircle
                  size={20}
                  className="absolute top-2 right-6"
                  opacity={0.6}
                  onClick={() => setReserveView(false)}
                />
                <div className=" alert alert-info gap-0 mb-4">
                  <div>상태: 취업확정</div>
                  <div className="text-sm mt-0"> 채팅이나 전화로 출근일을 조율하세요!</div>
                </div>
              </>
            )
          : null}
      </div>
      <div className="w-full h-[30vh] relative mb-4">
        <Image
          src={
            job.thumbnails && Array.isArray(job.thumbnails) && job.thumbnails[0] ? job.thumbnails[0]?.url : "/job.jpeg"
          }
          fill
          alt="asdf"
          className="object-cover"
        />
      </div>
      <div className="px-3 text-lg font-bold flex flex-wrap justify-between items-center">
        <div className="ml-3">{job.name}</div>
        {isEmployer ? (
          <button
            className="btn text-base font-light text-white h-8 min-h-0"
            onClick={() => router.push(`/employer/job/${job.id}/edit`)}
          >
            수정하기
          </button>
        ) : job.femaleApplicants.some((user) => user.id === self.id) ||
          job.maleApplicants.some((user) => user.id === self.id) ||
          job.maleReservers.some((user) => user.id === self.id) ||
          job.femaleReservers.some((user) => user.id === self.id) ? (
          <button
            className="btn text-base font-light text-white h-8 min-h-0"
            onClick={() => {
              if (!self.id) {
                router.push("/signin");
                return;
              }
              slice.do.unReserveJob(self.id);
            }}
          >
            취소하기
          </button>
        ) : (
          <button
            className="btn text-base font-light text-white h-8 min-h-0"
            onClick={() => {
              if (!self.id) {
                router.push("/signin");
                return;
              }
              slice.do.applyJob();
            }}
          >
            지원하기
          </button>
        )}
      </div>
      <div className="text-sm pl-3 ml-3 text-gray-400">
        현재 {job.totalFemaleApplicant + job.totalMaleApplicant}명이 지원을 했습니다.
      </div>
      <div className="flex flex-wrap w-full py-1">
        {/* <div className="mr-6">{job.departAt.format("MM / DD  HH:mm 출발")}</div> */}
        <div className="py-2 w-full border-gray-200 mx-2 bg-white flex border-[1px] rounded-lg">
          <Image
            alt="thmb"
            src={job.employer.image?.url ? job.employer.image.url : "/localjobs_logo.png"}
            width={65}
            height={65}
            className="self-center ml-2 object-cover rounded-full border-[1px] border-gray-100"
          />
          <div className="w-full">
            <div className="w-full my-auto flex flex-col h-full justify-center ml-4">
              {/* <div className="flex justify-around py-1 text-base"> */}
              <div className="font-bold text-2xl ml-1">{job.employer.nickname}</div>
              <div className="ml-2 font-medium text-base">
                번호<span className="font-light ml-4 ">{parsePhone(job.phone)}</span>
              </div>
              <div className="ml-2 font-medium text-base">
                주소
                <span className="font-light ml-4 ">
                  {job.employer.location &&
                    `${job.employer.location[0]} ${job.employer.location[1]} ${job.employer.detailLocation}`}
                </span>
              </div>
              {/* <div className="ml-2">
                나이: <span className="font-bold ml-1">{Utils.getAge(job.employer.dateOfBirth)}</span>
              </div> */}
            </div>
          </div>
          {job.chatBoard && (
            <button className="btn btn-square mr-2" onClick={onChat}>
              <BsFillChatDotsFill className="text-white h-8 w-8 p-[1px]" />
            </button>
          )}
        </div>
      </div>
      <div className="flex text-lg font-semibold text-gray-600 my-3">
        <div className={`mx-3 px-2 ${page === 1 && "text-black border-b-2"}`} onClick={() => setPage(1)}>
          구인내용
        </div>
        {isEmployer && (
          <div className={`mx-3 px-2 ${page === 2 && "text-black border-b-2"}`} onClick={() => setPage(2)}>
            지원자
          </div>
        )}
      </div>
      {page === 1 ? (
        <div className="mx-4">
          <div className="my-4 text-lg font-bold"> 기본정보</div>
          <div className=" p-5 text-lg bg-white rounded-lg border-[1px] border-gray-300">
            <div className="py-1">모집분야: {job.kind}</div>

            <div className="py-1">
              모집인원:{" "}
              {job.distinctGender
                ? `남 ${job.maxMaleReserver}명 / 여 ${job.maxFemaleReserver}명`
                : `${job.maxMaleReserver}명`}
            </div>
            <div className="py-1">월 급여 : {job.pay.toLocaleString()}원</div>
            <div className="py-1">최소 성실도 : {job.point}점</div>
            <div className="py-1">최소 근무기간 : {job.term}개월</div>
            <div className="py-1">
              마감일자: {job.due.format("YYYY년 MM월 DD일 ")}
              {weekDay[job.due.day()]}요일 {job.due.format("HH시 mm분")}
            </div>
          </div>
          <div className="my-4 text-lg font-bold">회사소개</div>
          <div
            className="p-2 mt-1 border-[1px] border-gray-300 bg-white rounded-lg "
            dangerouslySetInnerHTML={{ __html: job.content }}
          />
          <div className="my-4 text-lg font-bold"> 근무내용 및 자격요건</div>
          <div
            className="p-2 mt-1 border-[1px] border-gray-300 bg-white rounded-lg "
            dangerouslySetInnerHTML={{ __html: job.required }}
          />
        </div>
      ) : (
        <JobViewApplicants job={job} />
      )}
    </>
  );
};

const weekDay: string[] = ["월", "화", "수", "목", "금", "토", "일"];
const JobViewInSelf = ({ className, job, slice = st.slice.job }: JobViewProps) => {
  const self = st.use.self();
  const router = useRouter();
  return (
    <div className="text-lg pb-64">
      <JobView
        className={className}
        job={job}
        slice={slice}
        onChat={() => {
          job.chatBoard && !self.chatBoards.includes(job?.chatBoard) && st.do.joinChatBoard(job.chatBoard);
          router.push(`/job/${job.id}/${job.chatBoard}`);
        }}
      />
    </div>
  );
};
JobView.InSelf = JobViewInSelf;

const JobViewInEmployer = ({ className, job, slice = st.slice.job }: JobViewProps) => {
  const router = useRouter();
  const [cost, setCost] = useState<number>(0);
  const self = st.use.self();
  const [gender, setGender] = useState<"male" | "female">("male");
  const [isReserver, setIsReserver] = useState<"reserver" | "applicant">("applicant");
  const isEmployer = job.employer.id === self.id;
  const user = st.use.user();
  const [userModal, setUserModal] = useState<boolean>(false);

  useEffect(() => {
    if (!(job.employer.id === self.id) || !self.roles.includes("business")) {
      router.push(`/job/${job.id}`);
    }
  }, [job]);
  if (!(job.employer.id === self.id) || !self.roles.includes("business")) return <div> 허가되지않은 페이지입니다 </div>;

  return (
    <div className="text-lg pb-64">
      <JobView
        className={className}
        job={job}
        slice={slice}
        onChat={() => {
          router.push(`/employer/job/${job.id}/${job.chatBoard}`);
        }}
      />
    </div>
  );
};
JobView.InEmployer = JobViewInEmployer;

const JobViewApplicants = ({ job }: JobViewProps) => {
  const router = useRouter();
  const self = st.use.self();
  const [gender, setGender] = useState<"male" | "female">("male");
  const [isReserver, setIsReserver] = useState<"reserver" | "applicant">("applicant");
  const totalApplicant = [...job.maleApplicants, ...job.femaleApplicants] as gql.User[];
  const totalReserver = [...job.maleReservers, ...job.femaleReservers] as gql.User[];

  return (
    <div className="text-xl">
      <div className="p-2 pb-8 mt-4 ">
        <div className="flex justify-around py-1 text-base text-gray-500">
          <div>모집정원</div>
          {job.distinctGender ? (
            <>
              <div>
                남:{" "}
                <span className="font-bold">
                  {job.totalMaleReserver}/{job.maxMaleReserver}
                </span>
              </div>
              <div>
                여:{" "}
                <span className="font-bold">
                  {job.totalFemaleReserver}/{job.maxFemaleReserver}
                </span>
              </div>
            </>
          ) : (
            <div>
              {job.totalMaleReserver}/{job.maxMaleReserver}
            </div>
          )}
          <div className="flex justify-center">
            <button
              className={`btn m-0 h-7 mx-1 min-h-min ${
                isReserver === "applicant" ? "bg-primary text-white" : "bg-inherit text-gray-500"
              }`}
              onClick={() => {
                setIsReserver("applicant");
              }}
            >
              지원자
            </button>
            <button
              className={`btn m-0 h-7 mx-1 min-h-min ${
                isReserver === "reserver" ? "bg-primary text-white" : "bg-inherit text-gray-500"
              }`}
              onClick={() => {
                setIsReserver("reserver");
              }}
            >
              합격자
            </button>
          </div>
        </div>
        {isReserver === "reserver" ? (
          <>
            {totalReserver.map((user, idx) => (
              <div key={`${idx}-${user.id}`} className="flex my-2 items-center border border-gray-300 rounded-lg p-4 bg-white">
                <UserApplyItem
                  user={user}
                  onClick={async () => {
                    await st.do.viewUser(user.id);
                  }}
                />
                <Action.UnReserve id={user.id} job={job} />
              </div>
            ))}
          </>
        ) : (
          <>
            {totalApplicant.map((user, idx) => (
              <div  key={`${idx}-${user.id}`} className="flex my-2 items-center border border-gray-300 rounded-lg p-4 bg-white">
                <UserApplyItem
                  user={user}
                  onClick={async () => {
                    await st.do.viewUser(user.id);
                  }}
                />
                <Action.Reserve id={user.id} job={job} gender="male" />
                <div className="mx-1" />
                <Action.UnReserve id={user.id} job={job} />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};
