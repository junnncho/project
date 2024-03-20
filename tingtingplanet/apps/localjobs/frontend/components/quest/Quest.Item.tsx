import { gql, slice, st } from "../../stores";
import { parsePhone } from "../Common";
import Image from "next/image";
import { BiFemale, BiMale, BiPlus } from "react-icons/bi";
import { useRouter } from "next/navigation";
import { Action } from ".";

export const QuestItem = ({
  className,
  quest,
  slice = st.slice.quest,
  onClick,
}: {
  className?: string;
  quest: gql.LightQuest;
  slice?: slice.QuestSlice;
  onClick?: () => void;
}) => {
  return (
    <div className=" w-full rounded-lg bg-white shadow-sm mt-3 font-normal text-sm" onClick={onClick}>
      <div className="flex">
        <div className="relative min-w-max rounded-l-lg flex justify-center flex-col  overflow-hidden h-[100px]">
          <Image
            alt="thmb"
            src={
              quest.thumbnails && Array.isArray(quest.thumbnails) && quest.thumbnails[0]
                ? quest.thumbnails[0]?.url
                : "/quest.jpeg"
            }
            width={100}
            height={80}
            className=" object-cover border border-gray-300 rounded-xl my-auto"
          />
        </div>
        <div className="w-full pl-2 py-3 flex flex-col">
          <div className="flex justify-between">
            <span className="font-bold text-xl ml-2">{quest.name}</span>
            <div className="font-base mr-1 p-3 badge text-base text-white badge-primary">진행 중</div>
          </div>

          <div className="w-full mt-auto mb-2">
            <div className="ml-2 flex">
              <div className=" font-normal">
                지급 성실도 <b className="badge badge-secondary">{quest.point.toLocaleString()}포인트</b>
              </div>
            </div>

            <div className="ml-2 mt-1">
              마감기한 <b className="font-bold ml-1 badge badge-secondary">{quest.due.format("YYYY년 MM월 DD일 ")}</b>
            </div>
            {/* <div className="flex justify-between mx-5 mt-2">
              <div className="badge badge-secondary">{quest.term}개월</div>
              <div className="badge badge-secondary">성실도 {quest.point} 이상</div>
              <div className=" text-gray-400">{quest.totalFemaleApplicant + quest.totalMaleApplicant}명 지원</div>
            </div> */}
          </div>
        </div>
      </div>
      {/* <div className="flex items-center text-base">
        <div className="text-base text-gray-500 font-semibold">{`성실도: ${quest.point.toLocaleString()}이상`}</div>
        <div className="ml-auto flex items-center">{Ubin(quest)}</div>
      </div> */}
    </div>
  );
};

const QuestItemInSelf = ({
  className,
  quest,
  slice = st.slice.quest,
  onClick,
}: {
  className?: string;
  quest: gql.LightQuest;
  slice?: slice.QuestSlice;
  onClick?: () => void;
}) => {
  return (
    <div className="px-2 w-full">
      <div className="border-b border-secondary">
        <QuestItem className={className} quest={quest} slice={slice} onClick={onClick} />
      </div>
    </div>
  );
};
QuestItem.InSelf = QuestItemInSelf;
const QuestItemInEmployer = ({
  className,
  quest,
  slice = st.slice.quest,
  onClick,
}: {
  className?: string;
  quest: gql.LightQuest;
  slice?: slice.QuestSlice;
  onClick?: () => void;
}) => {
  return (
    <div className="px-2 w-full ">
      <div className="border-b border-secondary">
        <QuestItem className={className} quest={quest} slice={slice} onClick={onClick} />
      </div>
    </div>
  );
};
QuestItem.InEmployer = QuestItemInEmployer;

const QuestItemInNew = ({ url }: { url: string }) => {
  const router = useRouter();
  return (
    <div className="flex flex-row-reverse">
      <button
        className="text-center min-h-0 py-4 content-center btn rounded-lg mr-2 h-0"
        onClick={() => router.push(url)}
      >
        <BiPlus size={10} className="text-white" />
        <div className=" font-normal text-white text-sm ">추가하기</div>
      </button>
    </div>
  );
};
QuestItem.InNew = QuestItemInNew;
