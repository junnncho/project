import { AiOutlineComment, AiOutlineDelete, AiOutlineEdit, AiOutlineMore, AiOutlineWarning } from "react-icons/ai";
import { Avatar, Dropdown, List, RecentTime } from "@shared/ui-web";
import { Comment } from "..";
import { EmptyProfile, RemovedProfile } from "../common";
import { Modal } from "antd";
import { ModelProps } from "@shared/util-client";
import { ReactNode } from "react";
import { gql, slice, st, usePage } from "@social/data-access";

export const CommentItem = ({
  className,
  comment,
  slice = st.slice.comment,
  actions,
  columns,
  idx,
  self,
}: ModelProps<slice.CommentSlice, gql.LightComment> & {
  self: gql.shared.User;
}) => {
  const commentForm = slice.use.commentForm();
  const { l } = usePage();
  return (
    <List.Item className={`border-t-[0.5px] border-gray-300 ${comment.parent ? "ml-8" : ""}`}>
      <List.Item.Meta
        avatar={
          comment.user.image ? (
            <Avatar src={comment.user.image.url} />
          ) : (
            <EmptyProfile className={comment.parent ? "w-8 h-8 text-xl" : ""} />
          )
        }
        title={
          <div className="flex text-xs">
            {comment.user.nickname}
            <div className="ml-1 text-gray-400">
              <RecentTime
                date={comment.createdAt}
                breakUnit="day"
                timeOption={{ dateStyle: "short", timeStyle: "short" }}
              />
            </div>
          </div>
        }
        description={
          <div className="text-black">
            {comment.content}
            <div className="flex text-gray-400">
              <Comment.Action.Like slice={slice} idx={idx} comment={comment} />
              {commentForm.parent !== comment.id && (
                <button
                  className="gap-2 btn btn-ghost"
                  onClick={() =>
                    slice.do.newComment({
                      parent: comment.id,
                      parentType: "comment",
                      meta: comment.meta,
                    })
                  }
                >
                  <AiOutlineComment />
                  {l("main.reply")}
                </button>
              )}
            </div>
          </div>
        }
      />
      <Dropdown
        className="mb-10"
        value={<AiOutlineMore />}
        buttonClassName="btn btn-ghost"
        content={
          self.id === comment.user.id ? (
            <div className="flex flex-col gap-1">
              <button
                className="flex gap-1 flex-nowrap btn btn-sm btn-ghost"
                onClick={() => slice.do.editComment(comment.id)}
              >
                <AiOutlineEdit />
                {l("main.edit")}
              </button>
              <button
                className="flex gap-1 text-red-500 btn btn-sm btn-ghost flex-nowrap"
                onClick={() =>
                  Modal.confirm({
                    icon: <AiOutlineDelete />,
                    content: `${l("main.removeMsg")}`,
                    onOk: () => slice.do.removeComment(comment.id),
                  })
                }
              >
                <AiOutlineDelete />
                {l("main.remove")}
              </button>
            </div>
          ) : (
            <button
              className="flex gap-1 text-red-500 btn btn-sm btn-ghost flex-nowrap"
              onClick={() => window.alert("신고되었습니다.")}
            >
              <AiOutlineWarning className="mr-1" />
              {l("main.report")}
            </button>
          )
        }
      />
    </List.Item>
  );
};

interface CommentItemRemovedProps {
  comment: gql.LightComment;
  removedProfile?: ReactNode;
}

const CommentItemRemoved = ({ comment, removedProfile = <RemovedProfile /> }: CommentItemRemovedProps) => {
  const { l } = usePage();
  return (
    <List.Item className={`border-t-[0.5px] border-gray-300 ${comment.parent ? "ml-10" : "ml-3"}`}>
      <List.Item.Meta
        avatar={removedProfile}
        description={<div className="text-gray-300">{l("main.removeComment")}</div>}
      />
    </List.Item>
  );
};
CommentItem.Removed = CommentItemRemoved;
