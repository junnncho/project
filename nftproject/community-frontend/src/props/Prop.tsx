import { Dispatch } from "@reduxjs/toolkit";
import { UrlHistory } from "@remix-run/router/dist/history";
import { type } from "@testing-library/user-event/dist/types/setup/directApi";
import React, { ReactNode } from "react";
import { PictureCarousel } from "../components/carousel";
import { AccessStatus, getPostAPI, PostStatus } from "./apiProps";

export type Url = string;
export type img = [number, string];
export type WalletAddress = string;

export type Datetime = string;

export type CommuState = "home" | "announcement" | "dao" | "accountBook";
export const CommuStateArray = ["home", "announcement", "dao", "accountBook"];

export type ProfileState = "posts" | "nft" | "raffle" | "communities";
export const ProfileStateArray = ["posts", "nft", "raffle", "communities"];

export type ContentType =
  | "main"
  | "live"
  | "event"
  | "announcement"
  | "raffle"
  | "marketplace"
  | "communities"
  | null;

export type PageType =
  | "dao"
  | "total"
  | "unit"
  | "profile"
  | "home"
  | "error"
  | "community"
  | "live"
  | null;
export type DaoItems = {
  [key: string]: number;
};
export type RelationState = {
  follower: number;
  following: number;
  contribute: number;
  isFollow: boolean;
};
export type CommunityRelationState = {
  follower: number;
  rank: number;
  holders: number;
  isHolding: boolean;
  isFollow: boolean;
};
export type ProfilePageState = {
  profile: UserProfile;
  bannerImg: Url;
  nfts: 15;
  wallet: string;
  isFollow: boolean;
  relation: RelationState;
  description: string;
};
export type CommunityState = {
  community: UserProfile;
  members: number;
  items: number; //number of nft
  relation: CommunityRelationState;
  description: string;
};
export type HoldingNFTs = {
  [key: string]: Url[];
};

export type UserProfile = {
  name: string;
  id: number;
  img: Url;
};
export type LandProfile = {
  name: string;
  id: number;
  img: Url;
};

export type WalletState = {};
export type TotalCommunities = {
  [key: string]: CommunityState;
};
export type TotalComments = UnitComment[];
export type RaffleRequirement = {
  instruction: string;
  twitterFollow?: string;
  twitterRetweetURL?: string;
  twitterLikeURL?: string;
  joinDiscordURL?: string;
  community?: CommunityState;
  dueDate?: Datetime;
  isJoin?: boolean;
};
export type PostAuth = {
  holder: boolean;
  follower: boolean;
};

export interface PostState extends getPostAPI {
  typeId: PostStatus; // 게시판
  postTime: string;
  community: UserProfile;
  profile: UserProfile;
  content: string;
  imgs: img[] | null;
  likes: [number, boolean];
  comments: number; //comment갯수
  condition: AccessStatus;
  raffle: RafflePostState | null;
  vote: null;
  sharedPost?: PostState;
  comment: UnitComment[];
}
export type RaffleRequirements = {
  twitter?: FollowCondition;
  twitterLike?: FollowCondition;
  instagram?: FollowCondition;
  instagramLike?: FollowCondition;
  hashmoss?: FollowCondition;
  hashmossLike?: FollowCondition;
  discordJoin?: FollowCondition;
  facebookShare?: FollowCondition;
  facebookLike?: FollowCondition;
  facebookFollow?: FollowCondition;
};
export type FollowCondition = {
  name: string;
  id: number;
  satisfy: boolean;
};
export type UnitComment = {
  commentId: number;
  profile: UserProfile;
  likes: [number, boolean];
  content: string;
  postTime: Datetime;
  replies: number;
  replie: UnitComment[];
};

export type UnitReply = {
  replyId: number;
  profile: UserProfile;
  likes: [number, boolean];
  content: string;
  postTime: Datetime;
};

export type RafflePostState = {
  profile: UserProfile;
  participants: number;
  capacity: number;
  isJoin: boolean;
  condition: RaffleRequirements;
  description: string;
  time: string;
};

export interface UserProfileProps {
  profile: UserProfile;
  community?: boolean;
}
export interface PostProps {
  post: PostState;
  index: number;
  postLocation: string;
  sharedPost?: PostState;
  isUnit?: boolean;
}
export interface CommunityProfileProps {
  community: CommunityState;
  banner_img: string;
}
export interface RafflePostProps {
  raffle: RafflePostState;
}
export interface ElementProps {
  src: string;
}

export interface NFTCollectionProps {
  num: string;
  data: Url[];
}

export interface ContainerProps {
  children: React.ReactNode;
  reverse?: boolean;
}

export interface CommunitiesProps {
  data: UserProfile[][];
}
export interface CommunityNavProps {
  communities: UserProfile[];
  descriptions: string[];
  Volumes: string[];
}
export interface CommunityProps {
  community: UserProfile;
  description: string;
  Volume: string;
}
export interface InfiniteProps {
  getPosts: (
    offset: number,
    limit: number
  ) => (dispatch: Dispatch, getState: any) => Promise<any>;
  postLocation: string;
  id?: number;
}

export interface UnitBackgroundProps {
  backgroundImg: string | undefined;
  profile: UserProfile;
  children: ReactNode;
  relation: RelationState | CommunityRelationState;
}
export interface StatusProps {
  relation: RelationState | CommunityRelationState;
}

export interface DailyRecommendContainerProps {
  children: ReactNode;
}

export interface RaffleRecommendItemProps {
  community: UserProfile;
  dueDate: string;
  isJoin: boolean;
}
export interface ProfilePageProps {
  profilePage: ProfilePageState;
}
export interface CommentProps {
  c_index: number;
  index: number;
  postLocation: string;
  comment: UnitComment;
}
export interface ReplyProps {
  comment: UnitComment;
}
export interface CommentConsoleProps {
  postId: number;
  commentEA?: number;
  comments: UnitComment[];
  index: number;
  postLocation: string;
}

export interface UploadedImageProps {
  imgs: [string[], string[], number[]];
  setImgs: (imgs: [string[], string[], number[]]) => void;
  deleteFunc: () => void;
}

export interface ModalProps {
  isVisible: boolean;
  setVisible: (isvisible: boolean) => void;
  children?: React.ReactNode;
}
export interface PostingCommunityLists {
  communityProfiles: UserProfile[];
  communitySelecter: (commu: UserProfile) => void;
  setNav: (navstate: boolean) => void;
  navState: boolean;
}
// export interface ContentModal
export interface PostingWindowProps {
  post?: PostState;
  share?: PostState;
  edit?: boolean;
}
export interface SharedPostProps {
  post: PostState;
}
export interface UnitLandProps {
  imgSrc: Url;
  page: Url;
  index: number;
}
export interface RelationProps {
  relation: RelationState | CommunityRelationState;
  kind: "community" | "user";
}
export interface CommunityRelationProps {
  relation: CommunityRelationState;
}
export interface CommentingWindowProps {
  postId: number;
  index: number;
  postLocation: string;
}
export interface ReplyingWindowProps {
  c_index: number;
  commentId: number;
  user: UserProfile;
  index: number;
  postLocation: string;
}
export interface RepliesProps {
  index: number;
  c_index: number;
  postLocation: string;
  comment: UnitComment;
}

export type DaoState = {
  community: UserProfile;
  proposerProfile: UserProfile;
  description: string;
  condition: AccessStatus;
  voted: boolean;
  due: Date;
  daoItems: DaoItems;
};
export interface DaoProps {
  daoState: DaoState;
}

export interface PostProfileProps {
  userProfile: UserProfile;
  communityProfile: UserProfile;
  time: string;
  accessStatus: AccessStatus;
}
export interface PictureCarouselProps {
  pictures: Url[];
}
export interface PictureCarouselDeleteProps {
  imgs: [string[], string[], number[]];
  setImgs: (img: [string[], string[], number[]]) => void;
}
export interface PicrtureModalProps {
  ismodalView: boolean;
  setModalView: (state: boolean) => void;
  img: string;
}

export interface PostPictureModalProps {
  index: number;
  imgs: string[];
}

export interface ReduxPicrtureModalProps {
  ismodalView: boolean;
  img: string;
}

export interface SharedPostingProps {
  post: PostState;
}
export interface VisibleSetModalProps {
  isVisible: boolean;
  setVisible: (isVisible: boolean) => void;
  children: React.ReactNode;
}

export interface ImageUploadButtonProps {
  imgs: [string[], string[], number[]];
  setImgs: (img: [string[], string[], number[]]) => void;
  children: React.ReactNode;
  htmlId: number;
  isUnit?: boolean;
}

export interface ImageDeleteButtonProps {
  imgs: [string[], string[], number[]];
  setImgs: (img: [string[], string[], number[]]) => void;
  children: React.ReactNode;
  isUnit?: boolean;
  index: number;
}
