import { authHeaderProp } from "src/props";

export const authHeader = (getState: any): authHeaderProp => {
  const token = getState().AuthReducer?.token;
  if (token) {
    return { headers: { Authorization: `Bearer ${token}` } };
  } else {
    return undefined;
  }
};
