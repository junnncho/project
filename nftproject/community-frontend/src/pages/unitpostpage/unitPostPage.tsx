import { PostProps, PostState } from "src/props";
import { useLocation } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "src/components/hooks";
import { Post, PostContainer } from "src/components/postcomponents";
import { DummyPosts } from "src/dummy";
import { addPost } from "src/redux/actions/post";

export const UnitPostPage = () => {
  const link = useLocation().pathname;
  //link 에 있는 id를
  const id = Number(link.split("/")[2]);
  const dispatch = useAppDispatch();
  const posts = useAppSelector((state) => state.PostReducer.totalPost);
  let x: number = 0;
  let loc: string = "";
  let inRedux = false;
  Object.keys(posts).forEach((key) => {
    posts[key].map((value, index) => {
      if (value.postId === id) {
        x = index;
        loc = key;
        inRedux = true;
      }
    });
  });
  let post: PostState;
  if (!inRedux) {
    post = DummyPosts[0];
    dispatch(addPost(String(id), [{ ...DummyPosts[0] }]));
    x = 0;
    loc = String(id);
  }
  post = useAppSelector((state) => state.PostReducer.totalPost[loc][x]);
  if (!inRedux) {
    post = DummyPosts[0];
  }

  return (
    <div style={{ marginBottom: "5em" }}>
      <PostContainer>
        <Post post={post} isUnit={true} index={x} postLocation={loc}></Post>
      </PostContainer>
    </div>
  );
};
