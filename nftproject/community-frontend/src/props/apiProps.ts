import { UserProfile, Url, PostState, img } from "./Prop";

export interface SignInBody {
  account: string;
  signature: string;
}

export interface postPostProps {
  type: PostStatus;
  communityId: number;
  content: string;
  imgs: string[];
  condition: AccessStatus;
  shareId: number;
}

export interface postCommentProps {
  postid: number;
  content: string;
}
export interface postReplyProps {
  commentid: number;
  content: string;
}

export type authHeaderProp = { headers: { Authorization: string } } | undefined;

export interface postMethod1Body {
  content: string;
  name: string;
}

export enum AccessStatus {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
  HOLDER = "HOLDER",
}

export enum PostStatus {
  ANCEMENT = "ANNOUNCEMENT",
  KR = "KR",
  ENG = "ENG",
}
export enum PlaceStatus {
  PROFILE = "PROFILE",
  COMMU = "COMMUNITY",
  TOTAL = "TOTAL",
}

export interface GetProfileAPI {
  profile: UserProfile;
  nfts: number;
  communities?: UserProfile[];
  wallet: string;
  bannerImg?: string;
  description?: string;
}

export interface getPostAPI {
  postId: number;
  typeId: PostStatus;
  postTime: string;
  community: UserProfile;
  profile: UserProfile;
  content: string;
  imgs: img[] | null;
  likes: [number, boolean];
  comments: number; //comment갯수
  condition: AccessStatus;
  sharedPost?: PostState;
}

export interface GetCommentsAPI {
  commentId: number;
  profile: UserProfile;
  content: string;
  likes: [number, boolean];
  postTime: string;
  replies: number;
}

export interface GetRepliesAPI {
  replyId: number;
  profile: UserProfile;
  content: string;
  likes: [number, boolean];
  postTime: string;
}
