import React from "react";
import { ContainerProps } from "src/props";
export const PostContainer = ({ children }: ContainerProps) => {
  return <div className="postcontainer">{children}</div>;
};

export const ReversePostContainer = ({ children }: ContainerProps) => {
  return <div className="postcontainer reverse">{children}</div>;
};
