import { RepliesProps, CommentConsoleProps } from "src/props";
import { DummyUsers, dummyComments } from "src/dummy";
import { Reply } from ".";
import { ReplyingWindow, CommentingWindow } from ".";
import { Comment } from ".";
import { useAppSelector } from "src/components/hooks";
import { AuthState } from "src/props";
// export const ReplyingConsole = ({
//   index,
//   postLocation,
//   comment,
//   c_index,
// }: RepliesProps) => {
//   return (
//     <>
//       {comment.replie.map((val, index) => {
//         return <Reply comment={val} />;
//       })}
//       <ReplyingWindow
//         c_index={c_index}
//         comment={comment}
//         user={DummyUsers[0]}
//         index={index}
//         postLocation={postLocation}
//       />
//     </>
//   );
// };

export const CommentConsole = ({
  postId,
  comments,
  index,
  postLocation,
}: CommentConsoleProps) => {
  const auth: AuthState = useAppSelector((state) => state.AuthReducer);
  return (
    <>
      {comments.map((val, c_index) => {
        return (
          <Comment
            comment={val}
            c_index={c_index}
            index={index}
            postLocation={postLocation}
          />
        );
      })}
      {auth.user && (
        <CommentingWindow
          postId={postId}
          index={index}
          postLocation={postLocation}
        />
      )}
    </>
  );
};
