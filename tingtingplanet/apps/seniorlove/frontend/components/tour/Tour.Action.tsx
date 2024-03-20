import { AiOutlineCheckCircle, AiOutlineNumber } from "react-icons/ai";
import { Modal, RecentTime } from "@shared/ui-web";
import { gql, slice, st } from "../../stores";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { customStore } from "@seniorlove/frontend/stores/store";

// ! 샘플 액션(심플버전)입니다. 삭제 후 커스터마이징이 필요합니다.
interface ApproveProps {
  slice?: slice.TourSlice;
  tour: gql.LightTour;
  idx?: number;
}
export const Approve = ({ slice = st.slice.tour, tour, idx }: ApproveProps) => {
  return (
    <button
      className="btn gap-2"
      // onClick={() => slice.do.processTour(tour.id, idx)}
      onClick={() => null}
    >
      <AiOutlineNumber />
      Approve
    </button>
  );
};

// ! 샘플 액션(모달 상세버전)입니다. 삭제 후 커스터마이징이 필요합니다.
interface DenyProps {
  slice?: slice.TourSlice;
  tour: gql.LightTour;
  idx?: number;
}
export const Deny = ({ slice = st.slice.tour, tour, idx }: DenyProps) => {
  const tourForm = slice.use.tourForm();
  const tourModal = slice.use.tourModal();
  return (
    <>
      <button
        className="btn btn-primary gap-2"
        onClick={() => slice.do.editTour(tour.id, { modal: `deny-${tour.id}` })}
      >
        <AiOutlineCheckCircle />
        Deny
      </button>
      <Modal
        key={tour.id}
        width="80%"
        open={tourModal === `deny-${tour.id}`}
        onCancel={() => slice.do.resetTour()}
        // onOk={() => slice.do.denyTour(tour.id, idx)}
        okButtonProps={{ disabled: false }}
      >
        <div className="flex justify-between p-2 mt-4 mb-0 text-2xl border-b border-gray-200">
          <h3>{tour.id}</h3>
        </div>
        <div className="flex justify-between p-4 mt-0 text-xs bg-gray-50 md:text-base">
          <div>{tour.status}</div>
          <RecentTime
            date={tour.createdAt}
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

export const Reserve = ({
  slice = st.slice.tour,
  tour,
  id,
  className,
  gender,
  disabled = false,
}: {
  slice?: slice.TourSlice;
  tour: gql.LightTour | gql.Tour;
  id: string;
  gender: "male" | "female";
  className?: string;
  disabled?: boolean;
}) => {
  const maleOverReserved = gender === "male" && tour.totalMaleReserver >= tour.maxMaleReserver;
  const femaleOverReserved = gender === "female" && tour.totalFemaleReserver >= tour.maxFemaleReserver;
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
                slice.do.reserveTour(id);
                if (!tour.chatBoard) return;
                st.do.inviteChatBoard(tour?.chatBoard, id);
                setModal(false);
              }}
            >
              초과예약
            </button>
            <button className="btn btn-primary text-2xl w-32" onClick={() => setModal(false)}>
              취소
            </button>
          </div>
        }
      >
        <div className="w-full flex text-3xl justify-center p-8">정원이 초과되었습니다.</div>
        <div className="w-full flex text-xl  justify-center pb-8">그래도 추가로예약하시겠습니까?</div>
      </Modal>
      <button
        disabled={disabled || false}
        className={className ? className : "btn px-2"}
        onClick={() => {
          if (femaleOverReserved || maleOverReserved) {
            setModal(true);
            return;
          }
          slice.do.reserveTour(id);
          if (!tour.chatBoard) return;
          st.do.inviteChatBoard(tour?.chatBoard, id);
        }}
      >
        예약승인
      </button>
    </>
  );
};

export const Apply = ({
  slice = st.slice.tour,
  tour,
  className,
  disabled = false,
}: {
  slice?: slice.TourSlice;
  tour?: gql.LightTour | gql.Tour;
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
        slice.do.applyTour();
      }}
    >
      예약하기
    </button>
  );
};
export const UnReserve = ({
  slice = st.slice.tour,
  tour,
  id,
  className,
  disabled = false,
}: {
  slice?: slice.TourSlice;
  tour: gql.LightTour | gql.Tour;
  id: string;
  className?: string;
  disabled?: boolean;
}) => {
  const router = useRouter();
  return (
    <button
      className={className ? className : "btn px-2"}
      onClick={() => {
        if (!id) {
          router.push("/signin");
          return;
        }
        slice.do.unReserveTour(id);
        if (!tour.chatBoard) return;
        st.do.kickChatBoard(tour?.chatBoard, id);
      }}
    >
      예약취소
    </button>
  );
};

export const Inquiry = ({
  slice = st.slice.tour,
  tour,
  className,
  disabled = false,
}: {
  slice?: slice.TourSlice;
  tour: gql.LightTour | gql.Tour;
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
          store.setPhone(tour.phone);
        }}
      >
        전화하기
      </label>
    </>
  );
};
