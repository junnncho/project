import type { ContentType, PageType, PostState, UnitComment } from "src/props";
import { dummyComments, DummyPost, DummyPosts } from "src/dummy";
import { addPost } from "../actions/post";

export type TotalPost = {
  [key: string]: PostState[];
};
export interface initialState {
  totalPost: TotalPost;
}

const initialState: initialState = {
  totalPost: { total: [], added: [], profile: [] },
};

const PostReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "ADD_COMMENT":
      const c_total = state.totalPost;
      const c_posts = state.totalPost[action.community];
      const c_focus_post = state.totalPost[action.community][action.index];
      const c_edited_post = {
        ...c_focus_post,
        comment: [...c_focus_post.comment, ...action.comment],
      };
      c_posts[action.index] = c_edited_post;
      c_total[action.community] = c_posts;
      return {
        ...state,
        totalPost: {
          ...state.totalPost,
          [action.community]: c_posts,
        },
      };

    case "ADD_POST":
      const p_total = state.totalPost;
      // !state.totalPost.hasOwnProperty(action.community) &&
      //   (total[action.community] = []);
      console.log("addePostAccesse!");
      if (!(action.community in Object.keys(state.totalPost))) {
        p_total[action.community] = [];
      }
      const posts = [...state.totalPost[action.commmuntiy], ...action.newpost];
      p_total[action.commmuntiy] = posts;

      return {
        ...state,
        totalPost: { ...p_total, [action.commmuntiy]: posts },
      };

    case "ADD_REPLY":
      const r_total_posts = state.totalPost;
      const r_posts = state.totalPost[action.community];
      const r_focus_post = state.totalPost[action.community][action.index];
      const r_comments = r_focus_post.comment;
      let r_focus_comment = r_comments[action.c_index];
      const r_edited_comments = [...r_comments];
      console.log(r_focus_comment.replie ? "defined" : "undefined");
      r_edited_comments[action.c_index] = {
        ...r_focus_comment,
        replie: [
          ...(r_focus_comment.replie ? [] : r_focus_comment.replie),
          ...action.reply,
        ],
      };
      const r_edited_post = {
        ...r_focus_post,
        comment: [...r_edited_comments],
      };
      r_posts[action.index] = r_edited_post;
      r_total_posts[action.community] = r_posts;
      return {
        ...state,
        totalPost: {
          ...r_total_posts,
        },
      };

    case "INIT_COMMU":
      return {
        ...state,
        totalPost: { ...state.totalPost, [action.community]: [] },
      };
    default:
      return state;
  }
};
export default PostReducer;
