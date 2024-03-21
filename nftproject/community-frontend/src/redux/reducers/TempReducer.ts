export type element1 = { a: string; b: string };
export type element2 = string;

export interface initialState {}

const initialState: initialState = { element1: { a: "", b: "" }, element2: "" };

const TempReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_TEMP1":
      return {
        ...state,
        element1: action.payload,
      };
    case "SET_TEMP2":
      return {
        ...state,
        element2: action.payload,
      };
    default:
      return state;
  }
};

export default TempReducer;
