import { ApiService } from "../../ApiService";

import { Dispatch } from "redux";
import { authHeader } from "src/components/hooks";
const apiService: ApiService = new ApiService();

export const getProfile =
  (id: number) => (dispatch: Dispatch, getState: any) => {
    return new Promise<any>((resolve, reject) => {
      apiService
        .getProfile(id)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

export const updateProfile =
  (body: FormData) => (dispatch: Dispatch, getState: any) => {
    return new Promise<any>((resolve, reject) => {
      apiService
        .updateProfile(authHeader(getState), body)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
