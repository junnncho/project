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

interface JobEditProps {
  jobId?: string | null;
  slice?: slice.JobSlice;
}

// * 데이터 수정/생성 템플릿을 작성하세요. 외부에서 Modal, Div 등으로 컨테이너에 담을 용도로 Fragment(<></>) 기반으로 제작하세요.
export const JobEdit = ({ slice = st.slice.job, jobId = undefined }: JobEditProps) => {
  const jobForm = slice.use.jobForm();
  return (
    <>
      <div className="flex items-cente">
        {/* <p className="w-24 mt-3 text-center">{l("job.field")}</p> */}
        {/* <Input value={jobForm.field} onChange={(e) => slice.do.setFieldOnJob(e.target.value)} /> */}
      </div>
    </>
  );
};

const JobEditInEmployer = ({ slice = st.slice.job, jobId = undefined }: JobEditProps) => {
  const jobForm = slice.use.jobForm();
  const self = st.use.self();
  const router = useRouter();
  const jobSubmit = slice.use.jobSubmit();
  const isJobSubmitable = !jobSubmit.disabled && jobForm.name && jobForm.phone;
  const handleSubmit = async () => {
    if (!jobForm.name) return message.error("여행 제목을 입력해주세요!");
    if (!jobForm.phone) return message.error("문의번호를 입력해주세요!");
    if (!jobForm.point) return message.error("최소 성실도를 입력해주세요!");
    if (!jobForm.due.isValid()) return message.error("마감기간을 올바르게 입력해주세요!");
    if (!jobForm.content) return message.error("회사소개란을 정확히 입력해주세요!");
    if (!jobForm.required) return message.error("자격요건을 정확히 입력해주세요!");
    if (jobForm.id === null || jobForm.id.length === 0) {
      const generateChatBoard = await social.generateChatBoard([self.id], jobForm.name);
      slice.do.setJobForm({ ...jobForm, chatBoard: generateChatBoard });
    }
    try {
      await slice.do.submitJob();
    } catch (e) {
      message.error({
        content: "시스템 오류입니다. 관리자에게 문의해주세요. 화면을 캡쳐해주시면 큰 도움이 됩니다" + e.message,
        duration: 10,
      });
    }
    router.push("/employer/job");
  };
  useEffect(() => {
    slice.do.checkJobSubmitable();
  }, [jobForm]);
  if (!self.roles.includes("business") || (jobId && !(self.id === jobForm.employer?.id))) {
    router.push("/job");
    return <div>허가되지않은페이지입니다</div>;
  }
  return (
    <div className="w-full px-2 pb-20 text-base">
      <div className="flex items-center w-full pl-4 my-4">
        <div className="mr-4 overflow-hidden border rounded-full border-primary h-10">
          {jobForm.employer?.image ? (
            <Image src={jobForm.employer.image.url} alt={"회사로고"} width={50} height={50} className="object-cover" />
          ) : (
            <EmptyProfile width={40} />
          )}
        </div>
        <div className="mr-4 text-lg font-bold">{jobForm.employer?.nickname} </div>
        <div className="text-gray-500 text-lg">모집</div>
      </div>
      <div className="flex items-center w-full py-2">
        <div className="w-24 text-center">제목</div>
        <div className="flex items-center flex-1">
          <input
            className="w-full border-b-2 input h-10 text-xs h-10 text-xs border-primary"
            value={jobForm.name}
            onChange={(e) => slice.do.setNameOnJob(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center w-full py-2">
        <div className="w-24 text-center">모집마감</div>
        <input
          type="date"
          placeholder="YYYY-MM-DD"
          className="border border-b-2 input h-10 text-xs border-primary text-xs focus:outline-none"
          value={jobForm.due.format("YYYY-MM-DD")}
          onChange={(e) => slice.do.setDueOnJob(dayjs(e.target.value))}
        />
      </div>
      <input
        type="time"
        placeholder="HH-mm"
        className="mb-4 ml-24 border border-b-2 input h-10 text-xs border-primary text-sm focus:outline-none"
        value={jobForm.due.format("HH:mm")}
        onChange={(e) => {
          {
            // console.log(dayjs(e.target.valueAsDate?.toLocaleDateString()).hour(), e.target.valueAsDate);
            slice.do.setDueOnJob(
              jobForm.due
                .set("hour", dayjs(e.target.valueAsDate).hour() - 9)
                .set("minute", dayjs(e.target.valueAsDate).minute())
            );
          }
        }}
      />
      <div className="flex items-center w-full py-2">
        <div className="w-24 text-center">문의번호</div>
        <div className="flex items-center flex-1">
          <input
            className="w-full border border-b-2 input h-10 text-xs border-primary "
            value={jobForm.phone}
            onChange={(e) => slice.do.setPhoneOnJob(Utils.formatPhone(e.target.value))}
          />
        </div>
      </div>

      <div className="flex items-center w-full py-2">
        <div className="w-24 text-center">월 급여</div>
        <div className="flex items-center flex-1">
          <input
            type="number"
            className="w-full border border-b-2 input h-10 text-xs border-primary "
            value={jobForm.pay}
            onChange={(e) => slice.do.setPayOnJob(e.target.valueAsNumber)}
          />
          <div className="absolute right-8">원</div>
        </div>
      </div>
      <div className="flex items-center w-full py-2">
        <div className="w-24 text-center">최소 근무개월</div>
        <div className="flex items-center flex-1">
          <input
            type="number"
            className="w-full border border-b-2 input h-10 text-xs border-primary "
            value={jobForm.term}
            onChange={(e) => slice.do.setTermOnJob(e.target.valueAsNumber)}
          />
          <div className="absolute right-8">개월</div>
        </div>
      </div>
      <div className="flex items-center w-full py-2">
        <div className="w-24 text-center">최소 성실도</div>
        <div className="flex items-center flex-1">
          <input
            type="number"
            placeholder="0~100"
            min="0"
            max="100"
            className="w-full border border-b-2 input h-10 text-xs border-primary "
            value={jobForm.point}
            onChange={(e) => slice.do.setPointOnJob(e.target.valueAsNumber)}
          />
        </div>
      </div>
      <div className="flex items-center w-full py-2">
        <div className="w-24 text-center">직업 종류</div>
        <div className="flex items-center flex-1">
          <input
            className="w-full border-b-2 input h-10 text-xs h-10 text-xs border-primary"
            value={jobForm.kind}
            onChange={(e) => slice.do.setKindOnJob(e.target.value)}
          />
        </div>
      </div>
      <div className="flex items-center w-full py-2">
        <div className="text-center w-24">남녀 구분</div>
        <input
          type="checkbox"
          className="accent-primary w-5 h-5"
          checked={jobForm.distinctGender}
          onChange={(e) => slice.do.setDistinctGenderOnJob(e.target.checked)}
        />
      </div>
      {jobForm.distinctGender ? (
        <>
          <div className="flex items-center w-full py-2">
            <div className="w-24 text-center">남성 모집인원</div>
            <div className="absolute right-8">명</div>
            <div className="flex items-center flex-1">
              <input
                type="number"
                className="w-full border border-b-2 input h-10 text-xs border-primary "
                value={jobForm.maxMaleReserver}
                onChange={(e) => slice.do.setMaxMaleReserverOnJob(e.target.valueAsNumber)}
              />
            </div>
          </div>
          <div className="flex items-center w-full py-2">
            <div className="w-24 text-center">여성 모집인원</div>
            <div className="absolute right-8">명</div>
            <div className="flex items-center flex-1">
              <input
                type="number"
                className="w-full border border-b-2 input h-10 text-xs border-primary "
                value={jobForm.maxFemaleReserver}
                onChange={(e) => slice.do.setMaxFemaleReserverOnJob(e.target.valueAsNumber)}
              />
            </div>
          </div>
        </>
      ) : (
        <div className="flex items-center w-full py-2">
          <div className="w-24 text-center">모집인원</div>
          <div className="absolute right-8">명</div>
          <div className="flex items-center flex-1">
            <input
              type="number"
              className="w-full border border-b-2 input h-10 text-xs border-primary "
              value={jobForm.maxMaleReserver}
              onChange={(e) => slice.do.setMaxMaleReserverOnJob(e.target.valueAsNumber)}
            />
          </div>
        </div>
      )}

      <div className="flex items-center w-full py-2">
        <div className="w-24 text-center">회사 사진</div>
        <div className="flex items-center flex-1">
          <div className="">
            <Field.Imgs
              label=""
              files={jobForm.thumbnails}
              onUpdate={slice.do.setThumbnailsOnJob}
              addFiles={slice.do.uploadThumbnailsOnJob}
            />
          </div>
        </div>
      </div>
      <div className=" w-full py-2">
        <div className="text-center font-bold py-2">회사소개</div>
        <div className="flex items-center flex-1">
          <div className=" px-2 w-full">
            <Editor
              addFile={slice.do.addContentFilesOnJob}
              onChange={slice.do.setContentOnJob}
              addFilesGql={gql.addJobFiles}
              defaultValue={jobForm.content}
            />
          </div>
        </div>
      </div>
      <div className=" w-full py-2">
        <div className="text-center font-bold py-2">모집분야 및 자격요건</div>
        <div className="flex items-center flex-1">
          <div className=" px-2 w-full">
            <Editor
              addFile={slice.do.addRequiredFilesOnJob}
              onChange={slice.do.setRequiredOnJob}
              addFilesGql={gql.addJobFiles}
              defaultValue={jobForm.required}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <button className="gap-2 mr-2 btn btn-primary text-white" disabled={!isJobSubmitable} onClick={handleSubmit}>
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
JobEdit.InEmployer = JobEditInEmployer;
