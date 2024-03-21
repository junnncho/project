import {
  AuthState,
  CommentingWindowProps,
  GetCommentsAPI,
  GetRepliesAPI,
  ReplyingWindowProps,
} from "src/props";
import { useState, useEffect } from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
import { useAppDispatch, useAppSelector } from "src/components/hooks";
import { DummyUsers } from "src/dummy";
import {
  ProfilePicture,
  SmallProfilePicture,
} from "src/pages/profile/ProfilePicture";
import { addComment, addReply } from "src/redux/actions/post";
import { useApi } from "src/components/hooks";
import { postComment, postReply } from "src/redux/api";
export const CommentingWindow = ({
  postId,
  index,
  postLocation,
}: CommentingWindowProps) => {
  const dispatch = useAppDispatch();
  const auth: AuthState = useAppSelector((state) => state.AuthReducer);
  const post = useAppSelector(
    (state) => state.PostReducer.totalPost["total"][index]
  );
  const [value, setvalue] = useState<string>("");
  const [isContent, setContent] = useState<boolean>(false);
  const [loading1, data1, error1, postComment1] =
    useApi<GetCommentsAPI>(postComment);

  useEffect(() => {
    console.log("!!!!!!!!");
    if (data1) {
      console.log(data1);
      dispatch(addComment(postLocation, index, [{ ...data1, replie: [] }]));
    }
  }, [data1]); //api가 호출되고 response가 올 때마다 호출 -> data1이 빈값이 아니고 offset이 이미 최신화되어 있다면 data1값을 total 리덕스에 추가해줌

  return (
    <div className="COMMENTINPUT">
      <div
        style={{
          marginTop: "0.5em",
        }}
      >
        {auth.user?.profile && (
          <SmallProfilePicture profile={auth.user.profile} />
        )}
      </div>
      <ReactTextareaAutosize
        className="Commentinput"
        placeholder="What's up Mosses!"
        value={value}
        onChange={(e) => {
          let contents: string = e.currentTarget.value;
          setvalue(contents);
          setContent(contents !== "" ? true : false);
        }}
      ></ReactTextareaAutosize>

      <button
        className="top1 editButton"
        disabled={!isContent}
        onClick={() => {
          if (isContent) {
            postComment1({
              postid: postId,
              content: value,
            });
            setvalue("");
            setContent(false);
          }
        }}
      >
        Post
      </button>
    </div>
  );
};

export const ReplyingWindow = ({
  commentId,
  user,
  c_index,
  index,
  postLocation,
}: ReplyingWindowProps) => {
  const dispatch = useAppDispatch();
  const [isContent, setContent] = useState<boolean>(false);
  const [value, setvalue] = useState<string>("");
  const auth: AuthState = useAppSelector((state) => state.AuthReducer);
  const [loading1, data1, error1, postReply1] =
    useApi<GetRepliesAPI>(postReply);
  useEffect(() => {
    console.log("here's replies", postLocation);
    if (data1) {
      console.log(data1);
      dispatch(addReply(postLocation, [{ ...data1 }], c_index, index));
    }
  }, [data1]); //api가 호출되고 response가 올 때마다 호출 -> data1이 빈값이 아니고 offset이 이미 최신화되어 있다면 data1값을 total 리덕스에 추가해줌

  return (
    <div className="COMMENTINPUT">
      <div style={{ marginTop: "0.5em" }}>
        {auth.user?.profile && (
          <SmallProfilePicture profile={auth.user.profile} />
        )}
      </div>
      <ReactTextareaAutosize
        className="Commentinput"
        placeholder="What's up Mosses!"
        value={value}
        onChange={(e) => {
          let contents: string = e.currentTarget.value;
          setvalue(contents);
          setContent(contents !== "" ? true : false);
        }}
      ></ReactTextareaAutosize>

      <button
        className="top1 editButton"
        disabled={!isContent}
        onClick={() => {
          if (isContent) {
            postReply1({
              commentid: commentId,
              content: value,
            });
            setvalue("");
            setContent(false);
          }
        }}
      >
        Post
      </button>
    </div>
  );
};
