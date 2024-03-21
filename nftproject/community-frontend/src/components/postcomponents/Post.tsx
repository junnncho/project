import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SharedPostingModal } from "../modal";
import { PostProps, GetCommentsAPI } from "src/props";
import { CommentConsole } from "../commentComponents";
import { RaffleRequirements } from "./RaffleWindows";
import { SharedPost } from "./SharedPost";
import { useApi, useAppDispatch } from "../hooks";
import { getComments } from "src/redux/api";
import { addComment } from "src/redux/actions/post";
import { dummyDao } from "src/dummy";
import { DaoConsole } from "../daoComponents";
import { PostProfile } from "./PostProfile";
import { setModal, setVisible } from "src/redux/actions/modal";
import { PostImage } from "./PostImage";
import { PostOptionButton } from "../buttons";
import { localTime } from "src/functions/localTime";
export const Post = ({ post, isUnit, index, postLocation }: PostProps) => {
  const [commentClicked, setCommentClicked] = useState<boolean>(false);
  const [loading1, data1, error1, getComments1] =
    useApi<GetCommentsAPI[]>(getComments);
  const [daoClicked, setDaoClicked] = useState<boolean>(false);
  const [liked, setLiked] = useState<boolean>(post.likes[1]);
  const dispatch = useAppDispatch();
  const clickCommentButton = () => {
    if (!isUnit) {
      !commentClicked &&
        post.comment.length == 0 &&
        getComments1(post.postId, 0, 10);
      setCommentClicked(!commentClicked);
    }
  };

  useEffect(() => {
    if (data1 && post.comment.length == 0) {
      const temp = data1.map((item: GetCommentsAPI) => ({
        ...item,
        replie: [],
      }));
      dispatch(addComment(postLocation, index, temp));
    }
  }, [data1]);

  if (isUnit && !commentClicked) {
    setCommentClicked(true);
  }

  return (
    <>
      <div className="post main-frame top1 z1">
        <div className="contents">
          <div className="texts">
            <div style={{ display: "flex" }}>
              <PostProfile
                userProfile={post.profile}
                communityProfile={post.community}
                time={localTime(post.postTime)}
                accessStatus={post.condition}
              />
              <PostOptionButton
                post={post}
                index={index}
                postLocation={postLocation}
              ></PostOptionButton>
            </div>
            <Link to={`/post/${post.postId}`} className="contents">
              <div className="text" style={{ width: "100%" }}>
                {post.raffle && <RaffleRequirements raffle={post.raffle} />}
                {post.content}
                {post.sharedPost && <SharedPost post={post.sharedPost} />}
                <div>
                  {(post.postId === 250 || post.postId === 1) && (
                    <DaoConsole daoState={dummyDao} />
                  )}
                </div>
                {post.imgs && <PostImage className="images" imgs={post.imgs} />}
              </div>
            </Link>
          </div>
        </div>
        <div className="post-button-line"></div>
        <div className="buttons">
          <button
            onClick={() => {
              dispatch(setModal(SharedPostingModal, post));
              dispatch(setVisible(true));
            }}
          >
            <i className="bx bxs-share-alt right1"></i>
            Share
          </button>
          <button onClick={clickCommentButton}>
            <i className="bx bx-comment right1"></i>
            Comment{post.comments > 0 ? "s " + post.comments : ""}
          </button>
          <button
            className={liked ? "liked" : "disliked"}
            onClick={() => {
              setLiked(!liked);
            }}
          >
            <i className="bx bx-like right1"></i>
            Like
            {post.likes[0] !== 0 &&
              post.likes[0] +
                (post.likes[1] ? (liked ? 0 : -1) : liked ? 1 : 0)}
          </button>
        </div>
        <div className={commentClicked ? "commentcontainer" : "disabled"}>
          <CommentConsole
            postId={post.postId}
            comments={post.comment}
            index={index}
            postLocation={postLocation}
          />
        </div>
      </div>
    </>
  );
};
