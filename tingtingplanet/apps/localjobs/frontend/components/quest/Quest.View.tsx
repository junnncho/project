import { Action } from ".";
import { BiCheck, BiFemale, BiHourglass, BiMale, BiX } from "react-icons/bi";
import { Quest } from "..";
import { UserApplyItem, parsePhone } from "../Common";
import { Utils } from "@shared/util";
import { customStore } from "@localjobs/frontend/stores/store";
import { gql, slice, st } from "../../stores";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import dayjs from "dayjs";
import { AiFillCloseCircle, AiOutlineSend } from "react-icons/ai";
import { Field, message, Modal, Skeleton } from "@shared/ui-web";
import { BsFillChatDotsFill } from "react-icons/bs";
const weekDay: string[] = ["월", "화", "수", "목", "금", "토", "일"];
const calcAge = (ages: number[]) => {
  if (ages.length === 0) return 0;
  const average = (arr) => arr.reduce((p, c) => p + c, 0) / arr.length;
  return Math.floor(average(ages));
};

interface QuestViewProps {
  className?: string;
  quest: gql.Quest;
  slice?: slice.QuestSlice;
  children?: React.ReactNode;
  questVerify?: gql.LightQuestVerify[] | "loading";
  onChat?: () => void;
}

interface QuestView2Props {
  className?: string;
  slice?: slice.QuestSlice;
  children?: React.ReactNode;
  quest?: gql.Quest;
  questVerify: gql.LightQuestVerify[];
  onChat?: () => void;
}

// View를 작성하세요. 텍스트는 locale을 등록하여 사용하고, 내부 구현은 자유롭게 진행합니다.
export const QuestView = ({ className, children, quest, slice = st.slice.quest }: QuestViewProps) => {
  const self = st.use.self();
  const store = customStore();
  const router = useRouter();

  const [page, setPage] = useState<number>(1);

  return (
    <>
      <div className="sticky top-20 left-0 px-4 z-50 w-full"></div>
      <div className="w-full h-[30vh] relative mb-4">
        <Image
          src={
            quest.thumbnails && Array.isArray(quest.thumbnails) && quest.thumbnails[0]
              ? quest.thumbnails[0]?.url
              : "/quest.jpeg"
          }
          fill
          alt="asdf"
          className="object-cover"
        />
      </div>
      <div className="px-3 text-lg font-bold flex flex-wrap justify-between items-center">
        <div className="ml-3 text-black">{quest.name}</div>
        {self.roles.includes("admin") ? (
          <button
            className="btn text-base font-light text-white h-8 min-h-0"
            onClick={() => router.push(`/quest/${quest.id}/edit`)}
          >
            수정하기
          </button>
        ) : (
          <button className="btn text-base font-light text-white h-8 min-h-0" onClick={() => setPage(2)}>
            인증하기
          </button>
        )}
      </div>
      {/* <div className="text-sm pl-3 ml-3 text-gray-400">
        현재 {quest.totalFemaleApplicant + quest.totalMaleApplicant}명이 지원을 했습니다.
      </div> */}

      <div className="flex text-lg font-semibold text-gray-600 my-3">
        <div className={`mx-3 px-2 ${page === 1 && "text-black border-b-2"}`} onClick={() => setPage(1)}>
          퀘스트 내용
        </div>

        <div className={`mx-3 px-2 ${page === 2 && "text-black border-b-2"}`} onClick={() => setPage(2)}>
          참여내역
        </div>
      </div>

      {page === 1 ? (
        <div className="mx-4">
          <div className="my-4 text-lg font-bold"> 기본정보</div>
          <div className=" p-5 text-lg bg-white rounded-lg border-[1px] border-gray-300">
            <div className="py-1">회차당 지급 성실도 : {quest.point}점</div>
            <div className="py-1">
              마감일자: {quest.due.format("YYYY년 MM월 DD일 ")}
              {weekDay[quest.due.day()]}요일 {quest.due.format("HH시 mm분")}
            </div>
          </div>
          <div className="my-4 text-lg font-bold">퀘스트 내용</div>
          <div
            className="p-2 mt-1 border-[1px] border-gray-300 bg-white rounded-lg "
            dangerouslySetInnerHTML={{ __html: quest.content }}
          />
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

const QuestViewInSelf = ({ className, quest, questVerify, slice = st.slice.quest }: QuestViewProps) => {
  const self = st.use.self();
  const router = useRouter();
  return (
    <div className="p-4 text-lg pb-64">
      <QuestView className={className} quest={quest} slice={slice}>
        {questVerify === "loading" || !questVerify ? (
          <Quest.Loading />
        ) : (
          <QuestViewMy questVerify={questVerify} quest={quest} />
        )}
      </QuestView>
    </div>
  );
};
QuestView.InSelf = QuestViewInSelf;

const QuestViewInAdmin = ({ className, quest, questVerify, slice = st.slice.quest }: QuestViewProps) => {
  const router = useRouter();
  const self = st.use.self();

  useEffect(() => {
    if (!self.roles.includes("admin")) {
      router.push(`/quest`);
    }
  }, [quest]);
  if (!self.roles.includes("admin")) return <div> 허가되지않은 페이지입니다 </div>;

  return (
    <div className="text-lg pb-64">
      <QuestView className={className} quest={quest} slice={slice}>
        {questVerify === "loading" || !questVerify ? (
          <Quest.Loading />
        ) : (
          <QuestViewApplicants questVerify={questVerify} />
        )}
      </QuestView>
    </div>
  );
};
QuestView.InAdmin = QuestViewInAdmin;

const QuestViewApplicants = ({ questVerify }: QuestView2Props) => {
  const router = useRouter();
  const self = st.use.self();
  const [isReserver, setIsReserver] = useState<"all" | "applicant">("applicant");
  const pendingList = questVerify.filter((item) => item.status === "pending");
  return (
    <div className="text-xl">
      <div className="p-2 pb-8 mt-4 ">
        <div className="flex justify-around py-1 text-base text-gray-500">
          <div>승인현황</div>

          <div>
            {pendingList.length}/{questVerify.length}
          </div>
          <div className="flex justify-center">
            <button
              className={`btn m-0 h-7 mx-1 min-h-min ${
                isReserver === "applicant" ? "bg-primary text-white" : "bg-inherit text-gray-500"
              }`}
              onClick={() => {
                setIsReserver("applicant");
              }}
            >
              미승인
            </button>
            <button
              className={`btn m-0 h-7 mx-1 min-h-min ${
                isReserver === "all" ? "bg-primary text-white" : "bg-inherit text-gray-500"
              }`}
              onClick={() => {
                setIsReserver("all");
              }}
            >
              전체
            </button>
          </div>
        </div>
        {isReserver === "all" ? (
          <>
            {questVerify.map((item) => (
              <div className="flex flex-col" key={item.id}>
                <div className="flex my-2 items-center border border-gray-300 rounded-lg p-4 bg-white">
                  <UserApplyItem user={item.user as gql.User} />
                </div>
                <Image
                  alt={item.id}
                  height={300}
                  width={300}
                  className="object-cover w-30 h-30 mx-auto rounded-2xl border border-gray-300 "
                  src={item.images && item.images.length > 0 ? item.images[0].url : "/verify.png"}
                />
              </div>
            ))}
          </>
        ) : (
          <>
            {pendingList.map((item) => (
              <div className="flex flex-col" key={item.id}>
                <div className="flex my-2 items-center border border-gray-300 rounded-lg p-4 bg-white">
                  <UserApplyItem user={item.user as gql.User} />
                  <button
                    className={"btn btn-circle btn-sm border bg-white"}
                    onClick={() => {
                      gql.approveQuestVerify(item.id);
                      item.status = "completed";
                    }}
                  >
                    <BiCheck className="w-6 h-6 text-green-700" />
                  </button>
                  <button
                    className={"btn btn-circle btn-sm border bg-white"}
                    onClick={() => {
                      gql.unApproveQuestVerify(item.id);
                      item.status = "rejected";
                    }}
                  >
                    <BiX className="w-6 h-6 text-red-700" />
                  </button>
                </div>
                <Image
                  alt={item.id}
                  height={300}
                  width={300}
                  className="object-cover w-30 h-30 mx-auto rounded-2xl border border-gray-300 "
                  src={item.images && item.images.length > 0 ? item.images[0].url : "/verify.png"}
                />
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

const QuestViewMy = ({ questVerify, quest }: QuestView2Props) => {
  const slice = st.slice.questVerify;
  const router = useRouter();
  const questVerifyForm = slice.use.questVerifyForm();
  const self = st.use.self();
  const questVerifySubmit = slice.use.questVerifySubmit();
  const completedList = questVerify.filter((item) => item.status === "completed");
  slice.do.setUserOnQuestVerify(self);
  slice.do.setQuestOnQuestVerify(quest);
  const handleSubmit = async () => {
    try {
      await slice.do.submitQuestVerify();
    } catch (e) {
      message.error({
        content: "시스템 오류입니다. 관리자에게 문의해주세요. 화면을 캡쳐해주시면 큰 도움이 됩니다" + e.message,
        duration: 10,
      });
    }
  };
  useEffect(() => {
    st.do.newQuestVerify();
  }, []);
  useEffect(() => {
    slice.do.checkQuestVerifySubmitable();
  }, [questVerifyForm]);
  return (
    <div className="text-xl">
      <div className="p-2 pb-8 mt-4 ">
        <div className="flex justify-around py-1 text-base text-gray-500">
          <div>승인현황</div>

          <div>
            {completedList.length}/{questVerify.length}
          </div>
        </div>
        <div className="flex items-center w-full py-2">
          <div className="flex items-center flex-1">
            <div className="flex items-end">
              <Field.Imgs
                label=""
                files={questVerifyForm.images}
                onUpdate={slice.do.setImagesOnQuestVerify}
                addFiles={slice.do.uploadImagesOnQuestVerify}
              />
              <button className="gap-2 mr-2 btn btn-primary text-white" disabled={false} onClick={handleSubmit}>
                저장
              </button>
            </div>
          </div>
        </div>
        {questVerify.map((item) => (
          <div className="flex flex-col" key={item.id}>
            <div className="flex my-2 items-center border border-gray-300 rounded-lg p-4 bg-white items-start">
              <div className="flex flex-col mr-auto mb-auto h-full">
                <div className="font-light self-start text-gray-500 text-base">
                  {item.createdAt.format("YYYY년 MM월 DD일")}
                </div>
                {item.status === "completed" ? (
                  <BiCheck className="w-36 h-36 text-green-700" />
                ) : item.status === "rejected" ? (
                  <BiX className="w-36 h-36 text-red-700" />
                ) : (
                  <BiHourglass className="w-36 h-36 text-yellow-500" />
                )}
              </div>
              <Image
                alt={item.id}
                className="border border-gray-300 rounded-xl"
                height={150}
                width={150}
                src={item.images && item.images.length > 0 ? item.images[0].url : "/verify.png"}
              />
            </div>
            <div></div>
          </div>
        ))}
      </div>
    </div>
  );
};
