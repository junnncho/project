import { signAccount } from "src/functions";
import { useApiSimple } from "../hooks";
import { useAppSelector } from "../hooks";
import { signin, signup } from "src/redux/actions/auth";
import { AuthState, SignInBody, ContainerProps } from "src/props";
import { authCheck } from "src/redux/actions/auth";

export const ConnectWallet = ({ children }: ContainerProps) => {
  const [signinLoading, signinAction] = useApiSimple(signup);
  const [authCheckLoading, authChecknAction] = useApiSimple(authCheck);
  const auth: AuthState = useAppSelector((state) => state.AuthReducer);

  const signInButton = async () => {
    const body: SignInBody | undefined = await signAccount();
    console.log(body);
    typeof signinAction !== "boolean" && body && signinAction(body);
  };
  // useEffect(() => {
  //   console.log("!");
  //   if (localStorage.getItem("token") !== null && !auth.isAuthenticated) {
  //     typeof authChecknAction !== "boolean" && authChecknAction();
  //   }
  // }, []);

  return (
    <div className="connectWallet">
      {auth.isAuthenticated ? (
        children
      ) : signinLoading ? (
        <div>Loading</div>
      ) : (
        <button
          className="ProfileBar"
          style={{ alignItems: "center" }}
          onClick={signInButton}
        >
          Wallet Connect
        </button>
      )}
    </div>
  );
};
