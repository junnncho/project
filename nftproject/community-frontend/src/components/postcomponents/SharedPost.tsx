import { useState } from "react";
import { SharedPostProps } from "src/props";
import { PostProfile } from "./";
import { Link } from "react-router-dom";
import { PostImage } from "./PostImage";
import { localTime } from "src/functions/localTime";

export const SharedPost = ({ post }: SharedPostProps) => {
  const [clicked, setClicked] = useState<boolean>(false);
  const [liked, setLiked] = useState<boolean>(post.likes[1]);
  return (
    <div style={{ marginBottom: "1em" }}>
      <div className="Sharedpost">
        <div
          className="contents"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
        >
          <div className="texts">
            <PostProfile
              userProfile={post.profile}
              communityProfile={post.community}
              time={localTime(post.postTime)}
              accessStatus={post.condition}
            ></PostProfile>
            <Link to={`/post/${post.postId}`} className="contents">
              <div className="text" onClick={() => {}}>
                {post.content}
              </div>
            </Link>
            {post.imgs && <PostImage className="images" imgs={post.imgs} />}
          </div>
        </div>
      </div>
    </div>
  );
};
