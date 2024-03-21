import { Link, useLocation, useNavigate } from "react-router-dom";
import SidebarData from "./SidebarElement";
import "./index.css";
import { changeLink } from "src/functions";
export const Sidebar = ({ back }: any) => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="Sidebar">
      <div className="buttons">
        {/* <Link onClick={() => back(history)} to="/"> */}
        <img
          src="/logo/logo.png"
          className="logo"
          onClick={() => {
            back();
            navigate("/");
          }}
        />
        {/* </Link> */}
        {SidebarData.map((item) => (
          <Link to={item.path}>
            <div
              className={
                location.pathname == item.path ? "button selected" : "button"
              }
            >
              <i className={item.icon} />
              <div className="title">{item.title}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
