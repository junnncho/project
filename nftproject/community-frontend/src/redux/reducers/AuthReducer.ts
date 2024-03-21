import { AuthAction, AuthState, AuthStatus } from "src/props";
const initialState: AuthState = {
  token: localStorage.getItem("token"),
  isRegister: false,
  isAuthenticated: false,
  user: null,
};

const AuthReducer = (state: AuthState = initialState, action: AuthAction) => {
  switch (action.type) {
    case AuthStatus.LOGIN_SUCCESS:
      action?.payload && localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action?.payload,
        isAuthenticated: true,
        isRegister: false,
      };
    case AuthStatus.REGISTER_SUCCESS:
      action?.payload && localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        ...action?.payload,
        isAuthenticated: true,
        isRegister: true,
      };
    case AuthStatus.LOGIN_FAILURE:
    case AuthStatus.AUTH_ERROR:
    case AuthStatus.LOGOUT_SUCCESS:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false,
      };
    case AuthStatus.CHECKAUTH_SUCCESS:
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
      };
    case AuthStatus.REGISTER_FAILURE:
      localStorage.removeItem("token");
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
      };

    default:
      return state;
  }
};

export default AuthReducer;
