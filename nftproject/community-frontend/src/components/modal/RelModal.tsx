import { dummyCommuProfile } from "src/dummy";
import { setModal, setVisible } from "src/redux/actions/modal";
import { useApi, useAppDispatch } from "../hooks";
import { PostingWindow } from "../postcomponents";
import { PostingCommunityLists, PostState, AccessStatus } from "src/props";
import "./index.css";
import { EditPostingModal, SharedPostingModal } from "./SharedPostingModal";
import { deletePost } from "src/redux/api";
export const CommunitySelectModal = ({
  communityProfiles,
  communitySelecter,
  setNav,
  navState,
}: PostingCommunityLists) => {
  return (
    <div
      className="Modal"
      onClick={() => {
        setNav(true);
      }}
    >
      {communityProfiles.map((value, index) => {
        return (
          <button
            className="commucontents"
            onClick={(e) => {
              communitySelecter(value);
              setNav(false);
              e.stopPropagation();
            }}
          >
            <div>
              <img className="commupic" src={value.img} />
            </div>
            {value.name}
          </button>
        );
      })}
    </div>
  );
};

export const RangeSelectModal = ({
  range,
  setRange,
  setModal,
  modal,
}: {
  range: AccessStatus;
  setRange: (range: AccessStatus) => void;
  setModal: (modal: boolean) => void;
  modal: boolean;
}) => {
  return (
    <div className="RangeModal">
      <button
        className="commucontents"
        onClick={(e) => {
          setRange(AccessStatus.PUBLIC);
          setModal(false);
        }}
      >
        <i className="bx bx-globe" style={{ fontSize: "1.2em" }} />
        Global
      </button>
      <button
        className="commucontents"
        style={{ fontSize: "medium" }}
        onClick={(e) => {
          setRange(AccessStatus.PRIVATE);
          setModal(false);
        }}
      >
        <i className="bx bx-body" style={{ fontSize: "1.2em" }}></i> Follower
      </button>
      <button
        className="commucontents"
        style={{ fontSize: "medium" }}
        onClick={(e) => {
          setRange(AccessStatus.HOLDER);
          setModal(false);
        }}
      >
        <i className="bx bx-group" style={{ fontSize: "1.2em" }}></i> Members
      </button>
    </div>
  );
};

export const OptionSelectModal = ({
  modalState,
  post,
  setModalState,
}: {
  modalState: boolean;
  post: PostState;
  setModalState: (modal: boolean) => void;
}) => {
  const dispatch = useAppDispatch();
  const [loading, data, error1, deletePost1] = useApi<any>(deletePost);
  return (
    <div className="RangeModal">
      <button
        className="commucontents"
        style={{ fontSize: "medium" }}
        onClick={(e) => {
          deletePost1(post.postId);
          setModalState(false);
        }}
      >
        <i className="bx bx-trash" style={{ fontSize: "1.2em" }} />
        Delete
      </button>
      <button
        className="commucontents"
        style={{ fontSize: "medium" }}
        onClick={(e) => {
          setModalState(false);
        }}
      >
        <i className="bx bx-hide" style={{ fontSize: "1.2em" }}></i> Hide this
        post
      </button>
      <button
        className="commucontents"
        style={{ fontSize: "medium" }}
        onClick={(e) => {
          dispatch(setModal(EditPostingModal, post));
          dispatch(setVisible(true));
          setModalState(false);
        }}
      >
        <i className="bx bx-edit" style={{ fontSize: "1.2em" }}></i> Edit
      </button>
    </div>
  );
};
