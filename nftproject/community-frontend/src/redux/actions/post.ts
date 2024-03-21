import { GetRepliesAPI, PostState, UnitComment, UnitReply } from "src/props";
import { Community } from "src/dummy";

export const initPost = (community: string) => {
  return {
    type: "INIT_COMMU",
    community: community,
  };
};

export const addPost = (commmuntiy: string, newpost: PostState[]) => {
  return {
    type: "ADD_POST",
    commmuntiy: commmuntiy,
    newpost: newpost,
  };
};

export const addComment = (
  community: string,
  index: number,
  comment: UnitComment[]
) => {
  return {
    type: "ADD_COMMENT",
    community: community,
    comment: comment,
    index: index,
  };
};

export const addReply = (
  community: string,
  reply: UnitReply[],
  c_index: number,
  index: number
) => {
  return {
    type: "ADD_REPLY",
    community: community,
    reply: reply,
    c_index: c_index,
    index: index,
  };
};
