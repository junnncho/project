import { GetProfileAPI } from "./apiProps";

export interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  isRegister: boolean;
  user: GetProfileAPI | null;
}

export enum AuthStatus {
  LOGIN_SUCCESS = "LOGIN_SUCCESS",
  LOGIN_FAILURE = "LOGIN_FAILURE",
  LOGOUT_SUCCESS = "LOGOUT_SUCCESS",
  REGISTER_FAILURE = "REGISTER_FAILURE",
  REGISTER_SUCCESS = "REGISTER_SUCCESS",
  CHANGE_USER = "CHANGE_USER",
  AUTH_ERROR = "AUTH_ERROR",
  CHECKAUTH_SUCCESS = "CHECKAUTH_SUCCESS",
}

export interface SigninResponse {
  token: string;
  user: GetProfileAPI;
}

export interface AuthAction {
  type: AuthStatus;
  payload?: SigninResponse;
}

export interface TotalState {
  auth: AuthState;
}
