import { Editor, EmptyProfile, Field, message, Select } from "@shared/ui-web";
import { gql, slice, st } from "../../stores";
import Image from "next/image";
import dayjs from "dayjs";
import { useEffect } from "react";
import { AiOutlineSend } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { gql as social } from "@social/data-access";
import { latlngLocationMap, Utils } from "@shared/util";
import { BiTrash } from "react-icons/bi";

interface QuestEditProps {
  questId?: string | null;
  slice?: slice.QuestSlice;
}

// * 데이터 수정/생성 템플릿을 작성하세요. 외부에서 Modal, Div 등으로 컨테이너에 담을 용도로 Fragment(<></>) 기반으로 제작하세요.
export const QuestEdit = ({ slice = st.slice.quest, questId = undefined }: QuestEditProps) => {
  const questForm = slice.use.questForm();
  return (
    <>
      <div className="flex items-cente">
        {/* <p className="w-24 mt-3 text-center">{l("quest.field")}</p> */}
        {/* <Input value={questForm.field} onChange={(e) => slice.do.setFieldOnQuest(e.target.value)} /> */}
      </div>
    </>
  );
};

const QuestEditInAdmin = ({ slice = st.slice.quest, questId = undefined }: QuestEditProps) => {
  const questForm = slice.use.questForm();
  const self = st.use.self();
  const router = useRouter();
  const questSubmit = slice.use.questSubmit();
  const isQuestSubmitable = !questSubmit.disabled && questForm.name && questForm.point;
  const handleSubmit = async () => {
    if (!questForm.name) return message.error("퀘스트 제목을 입력해주세요!");
    if (!questForm.point) return message.error("최소 성실도를 입력해주세요!");
    if (!questForm.due.isValid()) return message.error("마감기간을 올바르게 입력해주세요!");
    if (!questForm.content) return message.error("회사소개란을 정확히 입력해주세요!");
    if (questForm.id === null || questForm.id.length === 0) {
      slice.do.setQuestForm({ ...questForm });
    }
    try {
      await slice.do.submitQuest();
    } catch (e) {
      message.error({
        content: "시스템 오류입니다. 관리자에게 문의해주세요. 화면을 캡쳐해주시면 큰 도움이 됩니다" + e.message,
        duration: 10,
      });
    }
    router.push("/quest");
  };
  useEffect(() => {
    slice.do.checkQuestSubmitable();
  }, [questForm]);
  if (!self.roles.includes("admin")) {
    router.push("/quest");
    return <div>허가되지않은페이지입니다</div>;
  }
  return (
    <div className="w-full px-2 pb-20 text-sm">
      <div className="flex items-center w-full py-2">
        <div className="w-24 text-center">제목</div>
        <div className="flex items-center flex-1">
          <input
            className="w-full border-b-2 input h-10 text-xs h-10 text-xs border-primary"
            value={questForm.name}
            onChange={(e) => slice.do.setNameOnQuest(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center w-full py-2">
        <div className="w-24 text-center">모집마감</div>
        <input
          type="date"
          placeholder="YYYY-MM-DD"
          className="border border-b-2 input h-10 text-xs border-primary text-xs focus:outline-none"
          value={questForm.due.format("YYYY-MM-DD")}
          onChange={(e) => slice.do.setDueOnQuest(dayjs(e.target.value))}
        />
      </div>
      <input
        type="time"
        placeholder="HH-mm"
        className="mb-4 ml-24 border border-b-2 input h-10 text-xs border-primary text-sm focus:outline-none"
        value={questForm.due.format("HH:mm")}
        onChange={(e) => {
          {
            // console.log(dayjs(e.target.valueAsDate?.toLocaleDateString()).hour(), e.target.valueAsDate);
            slice.do.setDueOnQuest(
              questForm.due
                .set("hour", dayjs(e.target.valueAsDate).hour() - 9)
                .set("minute", dayjs(e.target.valueAsDate).minute())
            );
          }
        }}
      />
      <div className="flex items-center w-full py-2">
        <div className="w-24 text-center">1회 당 성실도</div>
        <div className="flex items-center flex-1">
          <input
            type="number"
            placeholder="0~100"
            min="0"
            max="100"
            className="w-full border border-b-2 input h-10 text-xs border-primary "
            value={questForm.point}
            onChange={(e) => slice.do.setPointOnQuest(e.target.valueAsNumber)}
          />
        </div>
      </div>

      <div className="flex items-center w-full py-2">
        <div className="w-24 text-center">썸네일</div>
        <div className="flex items-center flex-1">
          <div className="">
            <Field.Imgs
              label=""
              files={questForm.thumbnails}
              onUpdate={slice.do.setThumbnailsOnQuest}
              addFiles={slice.do.uploadThumbnailsOnQuest}
            />
          </div>
        </div>
      </div>
      <div className=" w-full py-2">
        <div className="text-center font-bold py-2">퀘스트 내용</div>
        <div className="flex items-center flex-1">
          <div className=" px-2 w-full">
            <Editor
              addFile={slice.do.addContentFilesOnQuest}
              onChange={slice.do.setContentOnQuest}
              addFilesGql={gql.addQuestFiles}
              defaultValue={questForm.content}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <button className="gap-2 mr-2 btn btn-primary text-white" disabled={!isQuestSubmitable} onClick={handleSubmit}>
          <AiOutlineSend />
          저장
        </button>
        <button className="border-dashed btn btn-outline" onClick={() => router.back()}>
          취소
        </button>
      </div>
    </div>
  );
};
QuestEdit.InAdmin = QuestEditInAdmin;
