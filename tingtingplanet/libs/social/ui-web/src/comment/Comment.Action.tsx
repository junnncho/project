import { AiFillDislike, AiFillLike, AiOutlineDislike, AiOutlineLike, AiOutlineNumber } from "react-icons/ai";
import { gql, slice, st } from "@social/data-access";

interface ApproveProps {
  slice?: slice.CommentSlice;
  comment: gql.LightComment;
  idx?: number;
}
export const Approve = ({ slice = st.slice.comment, comment, idx }: ApproveProps) => {
  return (
    <button className="gap-2 btn btn-sm btn-primary" onClick={() => slice.do.approveComment(comment.id, idx)}>
      <AiOutlineNumber />
      Approve
    </button>
  );
};

interface DenyProps {
  slice?: slice.CommentSlice;
  comment: gql.LightComment;
  idx?: number;
}
export const Deny = ({ slice = st.slice.comment, comment, idx }: DenyProps) => {
  return (
    <button
      className="gap-2 btn btn-sm btn-warning btn-outline border-dashed"
      onClick={() => slice.do.denyComment(comment.id, idx)}
    >
      <AiOutlineNumber />
      Deny
    </button>
  );
};

interface LikeProps {
  slice?: slice.CommentSlice;
  comment: gql.LightComment;
  idx: number;
}
export const Like = ({ slice = st.slice.comment, comment, idx }: LikeProps) => {
  return (
    <>
      <button
        className="btn btn-ghost"
        onClick={() => {
          comment.like <= 0 ? slice.do.likeComment(idx) : slice.do.resetLikeComment(idx);
        }}
      >
        {comment.like > 0 ? <AiFillLike /> : <AiOutlineLike />}
        <span className="ml-1">{comment.totalStat.likes || ""}</span>
      </button>
      <button
        className="btn btn-ghost"
        onClick={() => {
          comment.like >= 0 ? slice.do.unlikeComment(idx) : slice.do.resetLikeComment(idx);
        }}
      >
        {comment.like < 0 ? <AiFillDislike /> : <AiOutlineDislike />}
      </button>
    </>
  );
};
