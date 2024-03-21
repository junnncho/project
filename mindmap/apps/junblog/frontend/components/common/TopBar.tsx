import React, { ReactNode } from 'react';

type BaseProps = {
  children: ReactNode;
  className?: string;
};

export const TopBar = ({ children, className }: BaseProps) => {
  // const {bg,main} = useColor();
  return <div className={`w-full h-screen flex flex-col`}>{children}</div>;
};
