import { AiOutlineCheckCircle, AiOutlineNumber } from "react-icons/ai";
import { Modal, RecentTime } from "@shared/ui-web";
import { gql, slice, st } from "@shared/data-access";

// ! 샘플 액션(심플버전)입니다. 삭제 후 커스터마이징이 필요합니다.
interface ApproveProps {
  slice?: slice.ThingSlice;
  thing: gql.LightThing;
  idx?: number;
}
export const Approve = ({ slice = st.slice.thing, thing, idx }: ApproveProps) => {
  return (
    <button
      className="btn gap-2"
      // onClick={() => slice.do.processThing(thing.id, idx)}
      onClick={() => null}
    >
      <AiOutlineNumber />
      Approve
    </button>
  );
};

// ! 샘플 액션(모달 상세버전)입니다. 삭제 후 커스터마이징이 필요합니다.
interface DenyProps {
  slice?: slice.ThingSlice;
  thing: gql.LightThing;
  idx?: number;
}
export const Deny = ({ slice = st.slice.thing, thing, idx }: DenyProps) => {
  const thingForm = slice.use.thingForm();
  const thingModal = slice.use.thingModal();
  return (
    <>
      <button
        className="btn btn-primary gap-2"
        onClick={() => slice.do.editThing(thing.id, { modal: `deny-${thing.id}` })}
      >
        <AiOutlineCheckCircle />
        Deny
      </button>
      <Modal
        key={thing.id}
        width="80%"
        open={thingModal === `deny-${thing.id}`}
        onCancel={() => slice.do.resetThing()}
        // onOk={() => slice.do.denyThing(thing.id, idx)}
        okButtonProps={{ disabled: false }}
      >
        <div className="flex justify-between p-2 mt-4 mb-0 text-2xl border-b border-gray-200">
          <h3>{thing.id}</h3>
        </div>
        <div className="flex justify-between p-4 mt-0 text-xs bg-gray-50 md:text-base">
          <div>{thing.status}</div>
          <RecentTime
            date={thing.createdAt}
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
