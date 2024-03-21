import React, { ReactNode } from "react";
import { EmptyComponent } from "src/components/modal";

export interface initialState {
  isvisible: boolean;
  zIndex: number;
  modal: (props: any) => any;
  props: any;
}
const initialState: initialState = {
  zIndex: -1000,
  isvisible: false,
  modal: EmptyComponent,
  props: {},
};
const ModalReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case "SET_MODAL":
      return {
        ...state,
        modal: action.component,
        props: action.props,
      };
    case "SET_VISIBLE":
      return {
        ...state,
        isvisible: action.isvisible,
        zIndex: action.zIndex,
      };
    default:
      return state;
  }
};
export default ModalReducer;
