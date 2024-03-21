import React, { useEffect } from "react";
import { isMobile } from "react-device-detect";
import { Link } from "react-router-dom";
import { useAppDispatch } from "src/components/hooks";
import { MainLand } from "src/components/land";
import { setPage } from "src/redux/actions/page";
import "./error.css";
export const ErrorPage: React.FC = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setPage("error"));
  }, []);
  if (isMobile) {
    return (
      <>
        <></>
      </>
    );
  }
  return (
    <div className="ErrorPage">
      <MainLand />
      <div className="text">Page Not Exists!!!</div>
      <div className="go-back">
        <Link to="/">
          <div className="blue-button">Go To Main</div>
        </Link>
      </div>
    </div>
  );
};
