import { ApiService } from "../../ApiService";

import { Dispatch } from "redux";
import { PlaceStatus, postPostProps } from "src/props";
import { authHeader } from "src/components/hooks/authHeader";

const apiService: ApiService = new ApiService();

export const getTotalPosts =
  (id: number, offset?: number, limit?: number) =>
  (dispatch: Dispatch, getState: any) => {
    return new Promise<any>((resolve, reject) => {
      let part1: string = offset ? `offset=${offset}` : "";
      let part2: string = limit ? `limit=${limit}` : "";
      let querystring: string = `?${part1}&${part2}`;
      apiService
        .getTotalPosts(authHeader(getState), querystring)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

export const getCommunityPosts =
  (id: number, offset?: number, limit?: number) =>
  (dispatch: Dispatch, getState: any) => {
    return new Promise<any>((resolve, reject) => {
      let part1: string = offset ? `offset=${offset}` : "";
      let part2: string = limit ? `limit=${limit}` : "";
      let querystring: string = `?${part1}&${part2}`;
      apiService
        .getUnitPosts(authHeader(getState), id, querystring, PlaceStatus.COMMU)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

export const getProfilePosts =
  (id: number, offset?: number, limit?: number) =>
  (dispatch: Dispatch, getState: any) => {
    return new Promise<any>((resolve, reject) => {
      let part1: string = offset ? `offset=${offset}` : "";
      let part2: string = limit ? `limit=${limit}` : "";
      let querystring: string = `?${part1}&${part2}`;
      apiService
        .getUnitPosts(
          authHeader(getState),
          id,
          querystring,
          PlaceStatus.PROFILE
        )
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

export const postPost =
  (body: FormData) => (dispatch: Dispatch, getState: any) => {
    return new Promise<any>((resolve, reject) => {
      apiService
        .postPost(authHeader(getState), body)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

export const updatePost =
  (id: number, body: FormData) => (dispatch: Dispatch, getState: any) => {
    console.log(id, body);
    return new Promise<any>((resolve, reject) => {
      apiService
        .updatePost(authHeader(getState), body, id)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

export const deletePost =
  (id: number) => (dispatch: Dispatch, getState: any) => {
    return new Promise<any>((resolve, reject) => {
      apiService
        .deletePost(authHeader(getState), id)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
