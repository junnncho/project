import { Link, useLocation } from "react-router-dom";
import { signAccount } from "src/functions";
import { useApiSimple } from "../hooks";
import { useAppSelector } from "../hooks";
import { signin, signup } from "src/redux/actions/auth";
import { AuthState, SignInBody } from "src/props";
import { authCheck } from "src/redux/actions/auth";
import { useEffect } from "react";
import { defaultImg } from "src/dummy";
import { ConnectWallet } from "../auth";

export const ProfileBar = () => {
  const auth: AuthState = useAppSelector((state) => state.AuthReducer);

  // useEffect(() => {
  //   console.log("!");
  //   if (localStorage.getItem("token") !== null && !auth.isAuthenticated) {
  //     typeof authChecknAction !== "boolean" && authChecknAction();
  //   }
  // }, []);

  return (
    <ConnectWallet>
      <Profile state={auth} />
    </ConnectWallet>
  );
};

export interface Temp {
  state: AuthState;
}

export const Profile = ({ state }: Temp) => {
  const profLink = "/profile/" + state.user?.profile.id;
  return (
    <div className="ProfileBar">
      <div className="ProfileImage">
        <Link to={profLink}>
          <img
            src={
              state.user && state.user.profile?.img
                ? state.user.profile.img
                : defaultImg
            }
            className="ProfileImage"
          />
        </Link>
      </div>

      <div className="nav-info">
        <h4>My wallet</h4>
        <p className="address">
          {state.user ? state.user.wallet.substring(0, 10) + "..." : ""}
        </p>
      </div>
      <div className="border"></div>
      <div className="nav-info">
        <h4>NFTs</h4>
        <span>{state.user ? state.user.nfts : 0}</span>
      </div>
      <div className="border"></div>
      <div className="nav-info">
        <h4>Communites</h4>
        <span>
          {state.user?.communities && typeof state.user.communities !== "number"
            ? state.user.communities.length
            : 0}
        </span>
      </div>
    </div>
  );
};

Profile.defaultProps = {
  class: "profile-container",
};
