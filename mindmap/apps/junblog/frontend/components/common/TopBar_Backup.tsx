// import React, { ReactNode } from "react";
// import Link from "next/link";
// import { My } from "..";
// import { isMobile } from "react-device-detect";
// import { useColor } from "@junblog/frontend/stores/client";

// type BaseProps = {
//   children: ReactNode;
//   className?: string;
// };

// export const TopBar = ({ children, className }: BaseProps) => {
//   const {bg,main} = useColor();
//   return (
//     <div className={`${bg} w-full h-screen flex flex-col`}>
//       {isMobile?<><div className="h-full flex-grow">{children}</div>
//       <My.Action.SimpleLogout className={`fixed bottom-1 right-1 ${main}`} /></>:<> <div className="w-full h-14 py-2 fixed top-0 z-50 flex items-center border-b-2">
//       <Link href="/" passHref className="flex items-center h-full ml-8">
//         <img className="h-[100%]" src="/logo2.png" height="100%" />
//         <div className="ml-4 font-bold text-xl">NOTE BRAIN</div>
//       </Link>
//       <My.Action.Login />
//     </div>
//     <div className={`pt-14 h-full flex-grow`}>{children}</div></>

//     }

//     </div>
//   );
// };
export {};
