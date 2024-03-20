import { AiOutlineCheckCircle, AiOutlineNumber } from "react-icons/ai";
import { Modal, RecentTime } from "@shared/ui-web";
import { gql, slice, st } from "../../stores";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { customStore } from "@localjobs/frontend/stores/store";
import { BiCheck, BiX } from "react-icons/bi";

// ! 샘플 액션(심플버전)입니다. 삭제 후 커스터마이징이 필요합니다.
interface ApproveProps {
  slice?: slice.JobSlice;
  job: gql.LightJob;
  idx?: number;
}
export const Approve = ({ slice = st.slice.job, job, idx }: ApproveProps) => {
  return (
    <button
      className="btn gap-2"
      // onClick={() => slice.do.processJob(job.id, idx)}
      onClick={() => null}
    >
      <AiOutlineNumber />
      Approve
    </button>
  );
};

// ! 샘플 액션(모달 상세버전)입니다. 삭제 후 커스터마이징이 필요합니다.
interface DenyProps {
  slice?: slice.JobSlice;
  job: gql.LightJob;
  idx?: number;
}
export const Deny = ({ slice = st.slice.job, job, idx }: DenyProps) => {
  const jobForm = slice.use.jobForm();
  const jobModal = slice.use.jobModal();
  return (
    <>
      <button className="btn btn-primary gap-2" onClick={() => slice.do.editJob(job.id, { modal: `deny-${job.id}` })}>
        <AiOutlineCheckCircle />
        Deny
      </button>
      <Modal
        key={job.id}
        width="80%"
        open={jobModal === `deny-${job.id}`}
        onCancel={() => slice.do.resetJob()}
        // onOk={() => slice.do.denyJob(job.id, idx)}
        okButtonProps={{ disabled: false }}
      >
        <div className="flex justify-between p-2 mt-4 mb-0 text-2xl border-b border-gray-200">
          <h3>{job.id}</h3>
        </div>
        <div className="flex justify-between p-4 mt-0 text-xs bg-gray-50 md:text-base">
          <div>{job.status}</div>
          <RecentTime date={job.createdAt} breakUnit="second" timeOption={{ dateStyle: "short", timeStyle: "short" }} />
        </div>
        <div className="flex justify-between p-2 mt-4 mb-0 text-2xl border-b border-gray-200">
          <h3>Deny Reason</h3>
          <input className="input input-bordered" />
        </div>
      </Modal>
    </>
  );
};

export const Reserve = ({
  slice = st.slice.job,
  job,
  id,
  className,
  gender,
  disabled = false,
}: {
  slice?: slice.JobSlice;
  job: gql.LightJob | gql.Job;
  id: string;
  gender: "male" | "female";
  className?: string;
  disabled?: boolean;
}) => {
  const maleOverReserved = gender === "male" && job.totalMaleReserver >= job.maxMaleReserver;
  const femaleOverReserved = gender === "female" && job.totalFemaleReserver >= job.maxFemaleReserver;
  const [modal, setModal] = useState(false);
  return (
    <>
      <Modal
        open={modal}
        onCancel={() => setModal(false)}
        footer={
          <div className="flex justify-around">
            <button
              className="btn btn-primary text-2xl w-32"
              onClick={() => {
                slice.do.reserveJob(id);
                // if (!job.chatBoard) return;
                // st.do.inviteChatBoard(job?.chatBoard, id);
                setModal(false);
              }}
            >
              초과지원
            </button>
            <button className="btn btn-primary text-2xl w-32" onClick={() => setModal(false)}>
              취소
            </button>
          </div>
        }
      >
        <div className="w-full flex text-3xl justify-center p-8">모집인원이 이미 충족되었습니다.</div>
        <div className="w-full flex text-xl  justify-center pb-8">그래도 추가로 지원하시겠습니까?</div>
      </Modal>
      <button
        disabled={disabled || false}
        className={className ? className : "btn btn-circle btn-sm border bg-white"}
        onClick={() => {
          if (femaleOverReserved || maleOverReserved) {
            setModal(true);
            return;
          }
          slice.do.reserveJob(id);
          // if (!job.chatBoard) return;
          // st.do.inviteChatBoard(job?.chatBoard, id);
        }}
      >
        <BiCheck className="w-6 h-6 text-green-700" />
      </button>
    </>
  );
};

export const Apply = ({
  slice = st.slice.job,
  job,
  className,
  disabled = false,
}: {
  slice?: slice.JobSlice;
  job?: gql.LightJob | gql.Job;
  className?: string;
  disabled?: boolean;
}) => {
  const self = st.use.self();
  const router = useRouter();
  return (
    <button
      disabled={disabled || false}
      className={className ? className : "btn px-2"}
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
  );
};
export const UnReserve = ({
  slice = st.slice.job,
  job,
  id,
  className,
  disabled = false,
}: {
  slice?: slice.JobSlice;
  job: gql.LightJob | gql.Job;
  id: string;
  className?: string;
  disabled?: boolean;
}) => {
  const router = useRouter();
  return (
    <button
      className={className ? className : "btn btn-circle btn-sm border bg-white"}
      onClick={() => {
        if (!id) {
          router.push("/signin");
          return;
        }
        slice.do.unReserveJob(id);
        // if (!job.chatBoard) return;
        // st.do.kickChatBoard(job?.chatBoard, id);
      }}
    >
      <BiX className="w-6 h-6 text-red-600" />
    </button>
  );
};

export const Inquiry = ({
  slice = st.slice.job,
  job,
  className,
  disabled = false,
}: {
  slice?: slice.JobSlice;
  job: gql.LightJob | gql.Job;
  className?: string;
  disabled?: boolean;
}) => {
  const store = customStore();

  return (
    <>
      <label
        htmlFor="my-modal-4"
        className={className ? className : "btn px-2"}
        onClick={() => {
          store.setPhone(job.phone);
        }}
      >
        전화하기
      </label>
    </>
  );
};
