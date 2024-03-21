import { ApiService } from "../../ApiService";

import { Dispatch } from "redux";
import { GetRepliesAPI, postReplyProps } from "src/props";
import { authHeader } from "src/components/hooks/authHeader";

const apiService: ApiService = new ApiService();

export const getReplies =
  (id: number, offset?: number, limit?: number) =>
  (dispatch: Dispatch, getState: any) => {
    return new Promise<GetRepliesAPI>((resolve, reject) => {
      let part1: string = offset ? `offset=${offset}` : "";
      let part2: string = limit ? `limit=${limit}` : "";
      let querystring: string = `?${part1}&${part2}`;
      apiService
        .getReplies(authHeader(getState), id, querystring)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };

export const postReply =
  (body: postReplyProps) => (dispatch: Dispatch, getState: any) => {
    return new Promise<any>((resolve, reject) => {
      apiService
        .postReply(authHeader(getState), body)
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err);
        });
    });
  };
