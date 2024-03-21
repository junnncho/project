import React, { useEffect } from "react";
import {
  InfinitePost,
  Post,
  PostContainer,
  PostingWindow,
  ReversePostContainer,
} from "src/components/postcomponents";
import { MainLand } from "src/components/land";
import { isMobile } from "react-device-detect";
import { useAppDispatch, useAppSelector } from "src/components/hooks";
import { setPage } from "src/redux/actions/page";
import { animated as a, useSpring } from "react-spring";
import "./index.css";
import { getTotalPosts } from "src/redux/api";

import { AuthState } from "src/props";

export const TotalTop = ({
  scrolled,
  backHome,
}: {
  scrolled: boolean;
  backHome: any;
}) => {
  const auth: AuthState = useAppSelector((state) => state.AuthReducer);
  const opacity_props = useSpring({
    opacity: scrolled ? 1 : 0,
  });

  return (
    <div>
      <div className="lands">
        <MainLand back={backHome} />
      </div>
      {scrolled && (
        <a.div style={opacity_props}>
          {auth.user && (
            <PostContainer>
              <PostingWindow />
            </PostContainer>
          )}
        </a.div>
      )}
    </div>
  );
};

const TotalPage: React.FC = () => {
  const dispatch = useAppDispatch();

  const Postss = useAppSelector((state) => state.PostReducer.totalPost);
  const auth: AuthState = useAppSelector((state) => state.AuthReducer);

  useEffect(() => {
    dispatch(setPage("total"));
  }, []);

  return (
    <>
      <div>
        <a.div className="Post">
          <ReversePostContainer>
            {Postss["added"].map((props, index) => {
              return <Post post={props} index={index} postLocation={"added"} />;
            })}
          </ReversePostContainer>

          <InfinitePost getPosts={getTotalPosts} postLocation="total" />
        </a.div>
      </div>
    </>
  );
};
export default TotalPage;
