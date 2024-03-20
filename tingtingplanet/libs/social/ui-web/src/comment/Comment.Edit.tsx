import { AiOutlineClose, AiOutlineSave, AiOutlineSend } from "react-icons/ai";
import { Avatar, Input, List } from "@shared/ui-web";
import { EmptyProfile } from "../common";
import { ReactNode } from "react";
import { gql, slice, st, usePage } from "@social/data-access";

interface CommentEditProps {
  slice?: slice.CommentSlice;
  self: gql.shared.User;
  emptyProfile?: ReactNode;
}

export const CommentEdit = ({ slice = st.slice.comment, self }: CommentEditProps) => {
  const commentForm = slice.use.commentForm();
  const { l } = usePage();
  return (
    <List.Item className={`border-t-[0.5px] border-gray-300 ${commentForm.parent ? "ml-8" : ""} bg-gray-50`}>
      <List.Item.Meta
        avatar={
          self.image ? (
            <Avatar src={self.image.url} />
          ) : (
            <EmptyProfile className={commentForm.parent ? "w-8 h-8 text-xl" : ""} />
          )
        }
        title={
          <div className="border-b border-gray-300 ">
            <Input
              className="w-full border-none"
              inputClassName="w-full border-none"
              // autoSize={{ maxRows: 10 }}
              value={commentForm.content}
              onChange={(e) => slice.do.setContentOnComment(e.target.value)}
              onPressEnter={(e) => e.ctrlKey && slice.do.createComment()}
              placeholder={l("main.placeHolderComment")}
            />
          </div>
        }
        description={
          <div className="flex justify-end ">
            <button className="gap-2 mr-3 text-gray-400 rounded-full btn" onClick={() => slice.do.resetComment()}>
              <AiOutlineClose />
              {l("main.close")}
            </button>
            <button className="gap-2 rounded-full btn btn-primary" onClick={() => slice.do.updateComment()}>
              <AiOutlineSave />
              {l("main.save")}
            </button>
          </div>
        }
      />
    </List.Item>
  );
};

interface CommentEditNewProps {
  slice?: slice.CommentSlice;
  self: gql.shared.User;
  emptyProfile?: ReactNode;
}
export const CommentEditNew = ({
  slice = st.slice.comment,
  self,
  emptyProfile = <EmptyProfile />,
}: CommentEditNewProps) => {
  const commentForm = slice.use.commentForm();
  const { l } = usePage();
  return (
    <List.Item className={`border-t-[0.5px] border-gray-300`}>
      <List.Item.Meta
        avatar={self.image ? <Avatar src={self.image.url} /> : emptyProfile}
        title={
          <div className="border-b border-gray-300 ">
            <Input
              className="w-full border-none"
              inputClassName="w-full border-none"
              value={commentForm.parent ? "" : commentForm.content}
              // autoSize={{ maxRows: 10 }}
              onFocus={() => slice.do.newComment()}
              onChange={(e) => slice.do.setContentOnComment(e.target.value)}
              onPressEnter={(e) => e.ctrlKey && slice.do.createComment()}
              placeholder={l("main.placeHolderComment")}
            />
          </div>
        }
        description={
          <div className="flex justify-end ">
            <button className="flex gap-2 btn btn-primary" onClick={() => slice.do.createComment()}>
              <AiOutlineSend />
              {l("main.comment")}
            </button>
          </div>
        }
      />
    </List.Item>
  );
};
CommentEdit.New = CommentEditNew;

interface CommentEditNewCocoProps {
  slice?: slice.CommentSlice;
  self: gql.shared.User;
  emptyProfile?: ReactNode;
  idx: number;
}
const CommentEditNewCoco = ({
  slice = st.slice.comment,
  self,
  idx,
  emptyProfile = <EmptyProfile className="w-8 h-8 text-xl" />,
}: CommentEditNewCocoProps) => {
  const { l } = usePage();
  const commentForm = slice.use.commentForm();
  return (
    <List.Item className={`border-t-[0.5px] border-gray-300 ml-8`}>
      <List.Item.Meta
        avatar={self.image ? <Avatar src={self.image.url} /> : emptyProfile}
        title={
          <div className="border-b border-gray-300 ">
            <Input
              className="w-full border-none"
              inputClassName="w-full border-none"
              // autoSize={{ maxRows: 10 }}
              value={commentForm.parent ? commentForm.content : ""}
              onChange={(e) => slice.do.setContentOnComment(e.target.value)}
              onPressEnter={(e) => e.ctrlKey && slice.do.createComment({ idx: idx + 1 })}
              placeholder={l("main.placeHolderComment")}
            />
          </div>
        }
        description={
          <div className="flex justify-end mt-3 ">
            <button className="gap-2 mr-3 text-gray-400 btn" onClick={() => slice.do.resetComment()}>
              <AiOutlineClose />
              {l("main.close")}
            </button>
            <button className="flex gap-2 btn btn-primary" onClick={() => slice.do.createComment({ idx: idx + 1 })}>
              <AiOutlineSend /> {l("main.comment")}
            </button>
          </div>
        }
      />
    </List.Item>
  );
};
CommentEdit.NewCoco = CommentEditNewCoco;
