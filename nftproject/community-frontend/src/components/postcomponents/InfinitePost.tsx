import React, { useEffect, useState } from "react";
import { Post, PostContainer } from "src/components/postcomponents";
import { useInView } from "react-intersection-observer";
import { useAppSelector, useApi, useAppDispatch } from "../hooks";
import { getTotalPosts } from "src/redux/api";
import { getPostAPI, InfiniteProps } from "src/props";
import { addPost, initPost } from "src/redux/actions/post";

export const InfinitePost = ({
  getPosts,
  postLocation,
  id = 0,
}: InfiniteProps) => {
  const [offset, setOffset] = useState<number>(0);
  const posts = useAppSelector((state) => state.PostReducer.totalPost);
  const dispatch = useAppDispatch();
  const [loading, data, error1, getPosts1] = useApi<getPostAPI[]>(getPosts);

  const [ref, inView] = useInView();

  useEffect(() => {
    posts[postLocation].length === 0 && getPosts1(id, 0, 10);
  }, []); //처음에 리덕스 total에 값 없으면 기본 10개 불러오는 api 호출

  useEffect(() => {
    console.log("data change", data, posts[postLocation], offset);
    if (data && posts[postLocation].length === offset) {
      const temp = data.map((item: getPostAPI) => ({
        ...item,
        vote: null,
        raffle: null,
        comment: [],
      }));
      console.log(temp);
      dispatch(addPost(postLocation, temp));
    }
  }, [data]); //api가 호출되고 response가 올 때마다 호출 -> data1이 빈값이 아니고 offset이 이미 최신화되어 있다면 data1값을 total 리덕스에 추가해줌

  useEffect(() => {
    console.log("loading", loading);
    if (inView && !loading && posts[postLocation].length != offset) {
      setOffset(posts[postLocation].length);
      getPosts1(id, offset, 10);
    }

    console.log(offset);
  }, [inView, loading]); //스크롤 하단 ref부분이 감지가 되면 / 로딩중이 아니고, offset값이 최신화가 안되어있으면 최신화 한후에 offset부터 10개 부르는 api호출

  return (
    <PostContainer>
      {posts[postLocation].map((props, index) =>
        posts[postLocation].length - 2 == index ? (
          <div ref={ref}>
            <Post post={props} index={index} postLocation={postLocation} />
          </div>
        ) : (
          <Post post={props} index={index} postLocation={postLocation} />
        )
      )}
      {loading && <div>Loading</div>}
    </PostContainer>
  );
};
