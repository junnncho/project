import { CommuState, ProfileState } from "@props";
import { useEffect } from "react";
import { setMenu } from "src/redux/actions/page";
import { useAppDispatch, useAppSelector } from "../hooks";

export const ProfileNav = ({ navStates }: { navStates: string[] }) => {
  const dispatch = useAppDispatch();
  const menu = useAppSelector((state) => state.PageReducer.menu);

  return (
    <div className="ProfileNav">
      {navStates.map((val, ind) => (
        <div
          className={menu == val ? "title hovered" : "title"}
          onClick={() => {
            dispatch(setMenu(val as CommuState | ProfileState));
          }}
        >
          {val}
        </div>
      ))}
    </div>
  );
};
