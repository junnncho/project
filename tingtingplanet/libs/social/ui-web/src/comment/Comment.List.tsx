import * as Comment from ".";
import { AiOutlineComment, AiOutlineDislike, AiOutlineLike, AiOutlineRedo } from "react-icons/ai";
import { DataListContainer, List, Pagination, Skeleton } from "@shared/ui-web";
import { DefaultOf, InitActionForm, ModelsProps } from "@shared/util-client";
import { gql, slice, st, usePage } from "@social/data-access";
import { useEffect } from "react";

export const CommentList = ({ slice = st.slice.comment, init }: ModelsProps<slice.CommentSlice, gql.Comment>) => {
  return (
    <DataListContainer
      init={init}
      slice={slice}
      renderItem={Comment.Item}
      renderDashboard={Comment.Stat}
      queryMap={gql.commentQueryMap}
      type="list"
      columns={[
        "content",
        {
          key: "totalStat",
          render: (totalStat: gql.StoryStat) => (
            <div className="flex items-center gap-1">
              <span className="flex items-center gap-1">
                <AiOutlineLike /> {totalStat.likes}
              </span>
              <span className="flex items-center gap-1">
                <AiOutlineDislike /> {totalStat.unlikes}
              </span>
            </div>
          ),
        },
        "rootType",
        {
          key: "user",
          render: (user: gql.shared.LightUser) => <div key={user.id}>{user.nickname}</div>,
        },
        "createdAt",
        "status",
      ]}
      actions={(comment: gql.LightComment, idx: number) => [
        "remove",
        ...(comment.status === "active"
          ? [
              {
                type: "approve",
                render: () => <Comment.Action.Approve comment={comment} idx={idx} slice={slice} />,
              },
              {
                type: "deny",
                render: () => <Comment.Action.Deny comment={comment} idx={idx} slice={slice} />,
              },
            ]
          : comment.status === "approved"
          ? [
              {
                type: "deny",
                render: () => <Comment.Action.Deny comment={comment} idx={idx} slice={slice} />,
              },
            ]
          : comment.status === "denied"
          ? [
              {
                type: "approve",
                render: () => <Comment.Action.Approve comment={comment} idx={idx} slice={slice} />,
              },
            ]
          : []),
      ]}
    />
  );
};

type CommentListInRootProps = {
  rootId: string;
  rootType: string;
  slice: slice.CommentSlice;
  self: gql.shared.User;
  init?: false | InitActionForm<gql.Comment>;
  filter?: (comment: gql.LightComment) => boolean;
  query?: Partial<DefaultOf<gql.Comment>>;
  disableNewComment?: boolean;
  showRefresh?: boolean;
};
const CommentListInRoot = ({
  rootId,
  rootType,
  slice,
  self,
  showRefresh,
  filter = () => true,
  query = {},
  disableNewComment,
  init = {},
}: CommentListInRootProps) => {
  const { l } = usePage();
  const commentForm = slice.use.commentForm();
  const commentList = slice.use.commentList();
  const commentCount = slice.use.commentCount();
  const pageOfComment = slice.use.pageOfComment();
  const limitOfComment = slice.use.limitOfComment();
  const commentModal = slice.use.commentModal();
  useEffect(() => {
    init !== false &&
      slice.do.initComment({
        ...init,
        query: { root: rootId, ...(init.query ?? {}) },
        default: {
          root: rootId,
          rootType,
          type: self.roles.includes("admin") ? "admin" : "user",
          user: self,
          ...(init?.default ?? {}),
        },
        sort: { parentCreatedAt: 1, createdAt: 1 },
      });
  }, [rootId]);
  return (
    <div className="mt-6">
      <h3 className="pb-2 mt-5 -mb-1 text-lg">
        <AiOutlineComment /> Comments ({commentCount})
        {showRefresh ? (
          <button
            className="relative ml-2 btn btn-outline btn-square btn-sm"
            onClick={() => slice.do.refreshComment({ invalidate: true })}
          >
            <AiOutlineRedo />
          </button>
        ) : null}
      </h3>
      <List>
        {!commentForm.id?.length && !commentForm.parent && !disableNewComment && (
          <Comment.Edit.New slice={slice} self={self} />
        )}
        {commentList === "loading" ? (
          <div className="flex gap-3 py-2">
            <Skeleton.Button active style={{ width: "60px", height: "60px", borderRadius: "100%" }} />
            <Skeleton />
          </div>
        ) : (
          commentList
            .filter(filter)
            .sort((a, b) => {
              const diff = a.parentCreatedAt.diff(b.parentCreatedAt);
              return diff === 0 ? a.createdAt.diff(b.createdAt) : diff;
            })
            .map((comment, idx) => (
              <div key={comment.id}>
                {comment.status === "removed" ? (
                  <Comment.Item.Removed comment={comment} />
                ) : commentForm.id === comment.id ? (
                  <Comment.Edit slice={slice} self={self} />
                ) : (
                  <Comment.Item idx={idx} comment={comment} slice={slice} self={self} />
                )}
                {!commentForm.id?.length && commentForm.parent === comment.id && (
                  <Comment.Edit.NewCoco slice={slice} self={self} idx={idx} />
                )}
              </div>
            ))
        )}
      </List>
      <div className="flex justify-center w-full mt-6 mb-10">
        <Pagination
          currentPage={pageOfComment}
          total={commentCount}
          onPageSelect={(page) => {
            slice.do.setPageOfComment(page);
          }}
          itemsPerPage={limitOfComment || 20}
        />
      </div>
    </div>
  );
};
CommentList.InRoot = CommentListInRoot;
