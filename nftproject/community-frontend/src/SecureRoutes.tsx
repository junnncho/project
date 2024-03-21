import TotalPage from "./pages/total";
import CommunityPage from "./pages/community";
import ProfilePage from "./pages/profile";
import OthersPage from "./pages/others";
import React, { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { useTransition, animated as a } from "react-spring";
import { useAppDispatch, useAppSelector } from "./components/hooks";

export interface routePart {
  path: string;
  component: React.FC;
}

export interface routePath {
  [key: string]: routePart[];
}

// const routePath: routePath = {
//   total: [{ path: "/main/*", component: TotalPage }],
//   unit: [{ path: "/community/*", component: UnitPage }],
//   profile: [{ path: "/profile/*", component: ProfilePage }],
// };
export type role = "home" | "total" | "unit" | "profile";

const SecureRoutes = () => {
  // const [role, setRole] = useState<role>("total");
  // // const genRoutes = (role: role) => {
  //   // const routeData = routePath[role];
  //   // if (routeData) {
  //   //   return routeData.map((data: routePart) => {
  //   //     let ComponentToRender: React.FC = data["component"];
  //   //     return (
  //   //       <Route
  //   //         key={data["path"]}
  //   //         path={data["path"]}
  //   //         element={<ComponentToRender />}
  //   //       />
  //   //     );
  //   //   });
  //   }
  //   return;
  // };

  return (
    <BrowserRouter>
      <Routes>
        {/* {genRoutes(role)} */}
        {/* <Route
          path="/"
          element={<HomePage scroll={scrolled} setScroll={setScroll} history />}
        /> */}
        <Route path="/*" element={<OthersPage />} />
        {/* <Route path="/main" element={<TotalPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/community" element={<UnitPage />} /> */}
        <Route path="*" element={<OthersPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default SecureRoutes;
