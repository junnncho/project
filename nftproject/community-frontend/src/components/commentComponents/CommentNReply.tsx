import {
  CommentProps,
  RepliesProps,
  ReplyProps,
  GetRepliesAPI,
  AuthState,
} from "src/props";
import { useState, useEffect } from "react";
import { DummyUsers } from "src/dummy";
import {
  ProfilePicture,
  SmallProfilePicture,
} from "src/pages/profile/ProfilePicture";
import { ReplyingWindow } from ".";
import { getReplies } from "src/redux/api";
import { useApi, useAppSelector } from "src/components/hooks";
import { useAppDispatch } from "src/components/hooks";
import { addReply } from "src/redux/actions/post";
import { localTime } from "src/functions/localTime";

export const Comment = ({
  comment,
  c_index,
  index,
  postLocation,
}: CommentProps) => {
  const [isClicked, setClicked] = useState<boolean>(false);
  const [isLike, setLike] = useState<boolean>(comment.likes[1]);
  const [loading1, data1, error1, getReplies1] =
    useApi<GetRepliesAPI[]>(getReplies);
  const clickReplyButton = () => {
    !isClicked &&
      comment.replie.length == 0 &&
      getReplies1(comment.commentId, 0, 10);
    setClicked(!isClicked);
  }; // reply 창 여는 버튼이 안눌려있었고, 커멘트의 reply가 로딩된게 없다면 0부터 10번까지의 리플라이를 불러온다
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (data1 && comment.replie.length == 0) {
      const temp = data1.map((item) => ({
        ...item,
      }));
      dispatch(addReply("total", temp, c_index, index));
    }
  }, [data1]);

  return (
    <>
      <div className={isClicked ? "replies" : "disabled"}>
        <Replies
          index={index}
          c_index={c_index}
          postLocation={postLocation}
          comment={comment}
        />
      </div>
      <div className="comment">
        <div className="contents">
          <SmallProfilePicture profile={comment.profile} />
          <div className="text">
            <div className="meta">
              <div className="name">{comment.profile.name}</div>
            </div>
            {comment.content}
          </div>
        </div>
        <div className="bottom">
          <div
            className={isLike ? "like" : "dislike"}
            onClick={() => {
              setLike(!isLike);
            }}
          >
            {comment.likes[0] +
              (comment.likes[1] ? (isLike ? 0 : -1) : isLike ? 1 : 0)}{" "}
            like
          </div>
          <div className="reply" onClick={clickReplyButton}>
            {`${comment.replies} reply`}
          </div>
          <div className="time">{localTime(comment.postTime)}</div>
        </div>
      </div>
    </>
  );
};
export const Replies = ({
  index,
  c_index,
  postLocation,
  comment,
}: RepliesProps) => {
  const auth: AuthState = useAppSelector((state) => state.AuthReducer);
  return (
    <>
      {comment.replie.map((val, index) => {
        return <Reply comment={val} />;
      })}
      {auth.user && (
        <ReplyingWindow
          c_index={c_index}
          commentId={comment.commentId}
          user={DummyUsers[0]}
          index={index}
          postLocation={postLocation}
        />
      )}
    </>
  );
};

export const Reply = ({ comment }: ReplyProps) => {
  const [isLike, setLike] = useState<boolean>(comment.likes[1]);
  return (
    <>
      <div className="contents">
        <SmallProfilePicture profile={comment.profile} />
        <div className="text">
          <div className="meta">
            <div className="name">{comment.profile.name}</div>
          </div>
          {comment.content}
        </div>
      </div>
      <div className="bottom">
        <div
          className={isLike ? "like" : "dislike"}
          onClick={() => {
            setLike(!isLike);
          }}
        >
          {comment.likes[0] +
            (comment.likes[1] ? (isLike ? 0 : -1) : isLike ? 1 : 0)}{" "}
          like
        </div>
        <div className="time">{localTime(comment.postTime)}</div>
      </div>
    </>
  );
};
