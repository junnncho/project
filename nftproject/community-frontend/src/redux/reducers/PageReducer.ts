import type {
  CommuState,
  ContentType,
  PageType,
  ProfileState,
} from "src/props";

export interface initialState {
  content: ContentType;
  page: PageType;
  number: number;
  menu: CommuState | ProfileState | null;
}

const initialState: initialState = {
  content: null,
  page: null,
  number: 0,
  menu: null,
};

const PageReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_CONTENT":
      return {
        ...state,
        content: action.payload,
      };
    case "SET_PAGE":
      return {
        ...state,
        page: action.payload,
      };
    case "SET_ID":
      return {
        ...state,
        number: action.payload,
      };
    case "SET_MENU":
      return {
        ...state,
        menu: action.payload,
      };
    default:
      return state;
  }
};

export default PageReducer;
