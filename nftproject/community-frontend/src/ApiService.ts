import axios from "axios";
import { API_URL, API_PROTOCOL } from "./config";
import {
  SignInBody,
  authHeaderProp,
  PlaceStatus,
  postPostProps,
  postCommentProps,
  postReplyProps,
} from "src/props";

const URL: string = API_PROTOCOL + API_URL;

export class ApiService {
  signIn(body: SignInBody) {
    return axios.post(`${URL}/auth/signin/`, body);
  }

  signUp(body: SignInBody) {
    return axios.post(`${URL}/auth/signup/`, body);
  }

  checkAuth(authHeader: authHeaderProp) {
    return axios.get(`${URL}/auth/`, authHeader);
  }

  getTotalPosts(authHeader: authHeaderProp, querystring: string) {
    return axios.get(`${URL}/post/${querystring}`, authHeader);
  }
  getUnitPosts(
    authHeader: authHeaderProp,
    id: number,
    querystring: string,
    type: PlaceStatus
  ) {
    switch (type) {
      case PlaceStatus.PROFILE:
        return axios.get(`${URL}/post/profile/${id}${querystring}`, authHeader);
      case PlaceStatus.COMMU:
        return axios.get(
          `${URL}/post/community/${id}${querystring}`,
          authHeader
        );
      default:
        throw new Error("input correct type");
    }
  }
  updatePost(authHeader: authHeaderProp, body: FormData, id: number) {
    return axios.patch(`${URL}/post/${id}`, body, authHeader);
  }

  deletePost(authHeader: authHeaderProp, id: number) {
    return axios.delete(`${URL}/post/${id}`, authHeader);
  }

  getComments(authHeader: authHeaderProp, id: number, querystring: string) {
    return axios.get(`${URL}/comment/${id}${querystring}`, authHeader);
  }

  getReplies(authHeader: authHeaderProp, id: number, querystring: string) {
    return axios.get(`${URL}/reply/${id}${querystring}`, authHeader);
  }
  getProfile(id: number) {
    return axios.get(`${URL}/profile/${id}`);
  }

  postPost(authHeader: authHeaderProp, body: FormData) {
    return axios.post(`${URL}/post/`, body, authHeader);
  }

  updateProfile(authHeader: authHeaderProp, body: FormData) {
    console.log("patch", authHeader);
    return axios.patch(`${URL}/profile/`, body, authHeader);
  }
  postComment(authHeader: authHeaderProp, body: postCommentProps) {
    return axios.post(`${URL}/comment/`, body, authHeader);
  }
  postReply(authHeader: authHeaderProp, body: postReplyProps) {
    return axios.post(`${URL}/reply/`, body, authHeader);
  }
}
