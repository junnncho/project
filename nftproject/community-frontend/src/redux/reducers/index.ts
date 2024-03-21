import { combineReducers } from "redux";
import PageReducer from "./PageReducer";
import PostReducer from "./PostReducer";
import AuthReducer from "./AuthReducer";
import ModalReducer from "./ModalReducer";
const rootReducer = combineReducers({
  PageReducer,
  PostReducer,
  AuthReducer,
  ModalReducer,
});

export default rootReducer;
