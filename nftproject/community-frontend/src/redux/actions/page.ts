import {
  CommunityState,
  CommuState,
  ContentType,
  PageType,
  ProfileState,
} from "src/props";

export const setContent = (content: ContentType) => {
  return {
    type: "SET_CONTENT",
    payload: content,
  };
};
export const setPage = (page: PageType) => {
  return {
    type: "SET_PAGE",
    payload: page,
  };
};
export const setNumber = (number: number) => {
  return {
    type: "SET_ID",
    payload: number,
  };
};

export const setMenu = (profileState: ProfileState | CommuState) => {
  return {
    type: "SET_MENU",
    payload: profileState,
  };
};
