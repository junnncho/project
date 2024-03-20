import { AiOutlineCheckCircle, AiOutlineNumber } from "react-icons/ai";
import { Modal, RecentTime } from "@shared/ui-web";
import { gql, slice, st } from "../../stores";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { customStore } from "@localjobs/frontend/stores/store";
import { BiCheck, BiX } from "react-icons/bi";

// ! 샘플 액션(심플버전)입니다. 삭제 후 커스터마이징이 필요합니다.
interface ApproveProps {
  slice?: slice.QuestSlice;
  quest: gql.LightQuest;
  idx?: number;
}

// ! 샘플 액션(모달 상세버전)입니다. 삭제 후 커스터마이징이 필요합니다.
interface DenyProps {
  slice?: slice.QuestSlice;
  quest: gql.LightQuest;
  idx?: number;
}
export const Deny = ({ slice = st.slice.quest, quest, idx }: DenyProps) => {
  const questForm = slice.use.questForm();
  const questModal = slice.use.questModal();
  return (
    <>
      <button
        className="btn btn-primary gap-2"
        onClick={() => slice.do.editQuest(quest.id, { modal: `deny-${quest.id}` })}
      >
        <AiOutlineCheckCircle />
        Deny
      </button>
      <Modal
        key={quest.id}
        width="80%"
        open={questModal === `deny-${quest.id}`}
        onCancel={() => slice.do.resetQuest()}
        // onOk={() => slice.do.denyQuest(quest.id, idx)}
        okButtonProps={{ disabled: false }}
      >
        <div className="flex justify-between p-2 mt-4 mb-0 text-2xl border-b border-gray-200">
          <h3>{quest.id}</h3>
        </div>
        <div className="flex justify-between p-4 mt-0 text-xs bg-gray-50 md:text-base">
          <div>{quest.status}</div>
          <RecentTime
            date={quest.createdAt}
            breakUnit="second"
            timeOption={{ dateStyle: "short", timeStyle: "short" }}
          />
        </div>
        <div className="flex justify-between p-2 mt-4 mb-0 text-2xl border-b border-gray-200">
          <h3>Deny Reason</h3>
          <input className="input input-bordered" />
        </div>
      </Modal>
    </>
  );
};

export const Approve = ({
  slice = st.slice.quest,
  id,
  className,
  disabled = false,
}: {
  slice?: slice.QuestSlice;
  id: string;
  className?: string;
  disabled?: boolean;
}) => {
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
                (slice.do as any).approveQuest(id);
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
          (slice.do as any).approveQuest(id);
        }}
      >
        <BiCheck className="w-6 h-6 text-green-700" />
      </button>
    </>
  );
};

export const Apply = ({
  slice = st.slice.quest,
  quest,
  className,
  disabled = false,
}: {
  slice?: slice.QuestSlice;
  quest?: gql.LightQuest | gql.Quest;
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
        slice.do.applyQuest();
      }}
    >
      지원하기
    </button>
  );
};
export const UnApprove = ({
  slice = st.slice.quest,
  quest,
  id,
  className,
  disabled = false,
}: {
  slice?: slice.QuestSlice;
  quest: gql.LightQuest | gql.Quest;
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
        (slice.do as any).unApproveQuest(id);
      }}
    >
      <BiX className="w-6 h-6 text-red-600" />
    </button>
  );
};

export const Inquiry = ({
  slice = st.slice.quest,
  quest,
  className,
  disabled = false,
}: {
  slice?: slice.QuestSlice;
  quest: gql.LightQuest | gql.Quest;
  className?: string;
  disabled?: boolean;
}) => {
  const store = customStore();

  return (
    <>
      <label htmlFor="my-modal-4" className={className ? className : "btn px-2"}>
        전화하기
      </label>
    </>
  );
};
