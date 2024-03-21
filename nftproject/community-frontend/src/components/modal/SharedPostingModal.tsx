import { PostingWindow } from "../postcomponents";
import { PostState, SharedPostProps } from "src/props";
import { ContentModal } from "./ModalFrame";

export const SharedPostingModal = (props: { props: PostState | undefined }) => {
  console.log("props", props.props);
  return (
    <div
      className="SharedPostingModal"
      onClick={(e) => {
        // e.stopPropagation();
      }}
    >
      <div className="postcontainer">
        <PostingWindow share={props.props} />
      </div>
    </div>
  );
};
export const EditPostingModal = (props: { props: PostState | undefined }) => {
  console.log("props", props.props);
  return (
    <div className="SharedPostingModal">
      <div className="postcontainer">
        <PostingWindow post={props.props} edit={true} />
      </div>
    </div>
  );
};
