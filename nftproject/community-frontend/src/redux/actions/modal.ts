import React from "react";

export const setModal = (component: (props: any) => any, props: any) => {
  return {
    type: "SET_MODAL",
    component: component,
    props: props,
  };
};
export const setVisible = (isvisible: boolean) => {
  return {
    type: "SET_VISIBLE",
    isvisible: isvisible,
  };
};
