import { AuthAction, AuthStatus, SignInBody, TotalState } from "src/props";
import { ApiService } from "../../ApiService";
import { authHeader } from "src/components/hooks/authHeader";
import { Dispatch } from "redux";
import { RootState } from "src/store";

const apiService = new ApiService();

export const signin =
  (body: SignInBody) => (dispatch: Dispatch<AuthAction>) => {
    return new Promise((resolve, reject) => {
      apiService
        .signIn(body)
        .then((res) => {
          dispatch({
            type: AuthStatus.LOGIN_SUCCESS,
            payload: res.data,
          });
          resolve(res);
        })
        .catch((err) => {
          dispatch({ type: AuthStatus.LOGIN_FAILURE });
          reject();
        });
    });
  };

export const signup =
  (body: SignInBody) => (dispatch: Dispatch<AuthAction>) => {
    return new Promise((resolve, reject) => {
      apiService
        .signUp(body)
        .then((res) => {
          dispatch({
            type: AuthStatus.LOGIN_SUCCESS,
            payload: res.data,
          });
          resolve(res);
        })
        .catch((err) => {
          dispatch({ type: AuthStatus.LOGIN_FAILURE });
          reject();
        });
    });
  };

// export const signout = () => (dispatch, getState) => {
//   apiService
//     .signOut(authHeader(getState))
//     .then((res) => {
//       dispatch({ type: AuthStatus.LOGOUT_SUCCESS });
//     })
//     .catch((err) => {
//       dispatch({ type: AuthStatus.AUTH_ERROR });
//     });
// };

export const authCheck =
  () => (dispatch: Dispatch<AuthAction>, getState: RootState) => {
    return new Promise((resolve, reject) => {
      apiService
        .checkAuth(authHeader(getState))
        .then((res) => {
          dispatch({
            type: AuthStatus.CHECKAUTH_SUCCESS,
            payload: res.data,
          });
          resolve(res);
        })
        .catch((err) => {
          dispatch({ type: AuthStatus.AUTH_ERROR });
          reject();
        });
    });
  };
