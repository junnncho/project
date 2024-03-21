import { setMenu } from "src/redux/actions/page";
import { useAppDispatch, useAppSelector } from "../hooks";

export const CommuNav = () => {
  const dispatch = useAppDispatch();
  const menu = useAppSelector((state) => state.PageReducer.menu);
  return (
    <div className="ProfileNav">
      <div
        className={menu == "home" ? "title hovered" : "title"}
        onClick={() => {
          dispatch(setMenu("home"));
        }}
      >
        Home{" "}
      </div>
      <div
        className={menu == "announcement" ? "title hovered" : "title"}
        onClick={() => {
          dispatch(setMenu("announcement"));
        }}
      >
        Announcement
      </div>
      <div
        className={menu == "dao" ? "title hovered" : "title"}
        onClick={() => {
          dispatch(setMenu("dao"));
        }}
      >
        DAO
      </div>
      <div
        className={menu == "accountBook" ? "title hovered" : "title"}
        onClick={() => {
          dispatch(setMenu("accountBook"));
        }}
      >
        Accountbook
      </div>
    </div>
  );
};
