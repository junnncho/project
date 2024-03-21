import {
  TotalCommunities,
  HoldingNFTs,
  UserProfile,
  PostProps,
  RaffleRecommendItemProps,
  TotalComments,
  PostState,
  PostAuth,
  ProfilePageState,
  RelationState,
  CommunityState,
  RafflePostProps,
  RaffleRequirements,
  RafflePostState,
  CommunityRelationState,
  UnitComment,
  AccessStatus,
  PostStatus,
  DaoState,
} from "src/props";
import React from "react";

export const defaultImg = "/img/default_profile.jpeg";

export const HoldingNFTs_1: HoldingNFTs = {
  1: Array.from(
    Array(10),
    (_, index) => `/img/nft/AZUKI/${(index + 1).toString()}.png`
  ),
  2: Array.from(
    Array(13),
    (_, index) => `/img/nft/BAYC/${(index + 1).toString()}.png`
  ),
  3: Array.from(
    Array(13),
    (_, index) => `/img/nft/CoolCats/${(index + 1).toString()}.png`
  ),
  4: Array.from(
    Array(7),
    (_, index) => `/img/nft/Doodles/${(index + 1).toString()}.png`
  ),
  6: Array.from(
    Array(5),
    (_, index) => `/img/nft/MoonBirds/${(index + 1).toString()}.png`
  ),
};

export const Community = [
  "/img/project/Bored_Ape_Kennel_Club.png",
  "/img/project/Bored_Ape_Yacht_Club.png",
  "/img/project/Cool_Cats_Nft.png",
  "/img/project/Doodles.png",
  "/img/project/Gardenlockdown.jpeg",
  "/img/project/God_Hates_NFTees.gif",
  "/img/project/Jenkins_The_Valet.png",
  "/img/project/Kitaro_World_Official.gif",
];

export const CommunityProfiles = {
  1: { name: "AZUKI", id: 1, img: "/img/project/Azuki.png" },
  2: { name: "CoolCats", id: 3, img: "/img/project/Cool_Cats_Nft.png" },
  3: { name: "Doodles", id: 4, img: "/img/project/Doodles.png" },
  4: {
    name: "Jenkins The Valet",
    id: 5,
    img: "/img/project/Jenkins_The_Valet.png",
  },
  5: { name: "Moonbirds", id: 6, img: "/img/project/Moonbirds.webp" },
  6: { name: "KITARO", id: 7, img: "/img/project/Kitaro_World_Official.png" },
  7: { name: "Gardenlockdown", id: 8, img: "/img/project/Gardenlockdown.jpeg" },
  8: { name: "Doodles", id: 4, img: "/img/project/Doodles.png" },
};

export const CommunityDescriptionArray: string[] = [
  "azuki is number 1 nft crypto product",
  "azuki is number 1 nft crypto product",
  "azuki is number 1 nft crypto product",
  "azuki is number 1 nft crypto product",
  "asdf",
  "asdf",
];
export const dummyCommuProfile: UserProfile = {
  name: "BAYC",
  id: 1,
  img: "/img/project/Bored_Ape_Yacht_Club.png",
};
export const CommunityProfileArray: UserProfile[] = [
  dummyCommuProfile,
  CommunityProfiles[2],
  CommunityProfiles[3],
  CommunityProfiles[4],
  CommunityProfiles[5],
  CommunityProfiles[6],
];
export const DummyUsers: UserProfile[] = [
  {
    name: "GooGooHolder",
    id: 1,
    img: "/img/project/Doodles.png",
  },
  {
    name: "10뉴비",
    id: 1,
    img: "/img/nft/Metakingz/1.png",
  },
  {
    name: "elonmusk",
    id: 1,
    img: "/img/marsman.jpeg",
  },
];

export const dummyCommuRelation: CommunityRelationState = {
  follower: 213412,
  rank: 1,
  holders: 300021,
  isHolding: false,
  isFollow: false,
};
export const DummyRelation: RelationState = {
  follower: 20,
  following: 34,
  contribute: 12,
  isFollow: true,
};

export const DummyAuth: AccessStatus = AccessStatus.PUBLIC;
export const dummyProfilePage: ProfilePageState = {
  isFollow: false,
  description: "wolf of hashmoss",
  profile: DummyUsers[0],
  bannerImg: "/img/project/Doodles.png",
  nfts: 15,
  wallet: "0x5353453453453445",
  relation: DummyRelation,
};
export const dummyCommunity: CommunityState = {
  community: dummyCommuProfile,
  members: 10203,
  items: 1231,
  description: "world  best NFT community",
  relation: dummyCommuRelation,
};
export const Communities: TotalCommunities = {
  1: dummyCommunity,
  2: {
    community: CommunityProfiles[2],
    members: 4,
    items: 4,
    description: "asdf",
    relation: dummyCommuRelation,
  },
  3: {
    community: CommunityProfiles[3],
    members: 4,
    items: 4,
    description: "asdf",
    relation: dummyCommuRelation,
  },
  4: {
    community: CommunityProfiles[4],
    members: 4,
    items: 4,
    description: "asdf",
    relation: dummyCommuRelation,
  },
  5: {
    community: CommunityProfiles[5],
    members: 4,
    items: 4,
    description: "asdf",
    relation: dummyCommuRelation,
  },
  6: {
    community: CommunityProfiles[6],
    members: 4,
    items: 4,
    description: "asdf",
    relation: dummyCommuRelation,
  },
  7: {
    community: CommunityProfiles[7],
    members: 4,

    items: 4,
    description: "asdf",
    relation: dummyCommuRelation,
  },
  8: {
    community: CommunityProfiles[8],
    members: 4,
    items: 4,
    description: "asdf",
    relation: dummyCommuRelation,
  },
};
export const dummyFollowCondition = {
  name: "@Googoo",
  id: 1232,
  satisfy: false,
};
export const dummyRaffleRequirements: RaffleRequirements = {
  // twitter: dummyFollowCondition,
  twitterLike: dummyFollowCondition,
  discordJoin: dummyFollowCondition,
  hashmoss: dummyFollowCondition,
  hashmossLike: dummyFollowCondition,
  instagram: dummyFollowCondition,
  instagramLike: dummyFollowCondition,
};
export const dummyRaffle: RafflePostState = {
  profile: CommunityProfiles[1],
  participants: 100,
  capacity: 15,
  isJoin: false,
  condition: dummyRaffleRequirements,
  description: "this raffle is fuckin hot",
  time: "3 hours left",
};
export const dummyComments: UnitComment[] = [
  {
    commentId: 1,
    profile: DummyUsers[0],
    likes: [3, false],
    content:
      "수원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니까?",
    postTime: "3hours ago",
    replies: 0,
    replie: [
      {
        commentId: 1,
        profile: DummyUsers[0],
        likes: [3, false],
        content:
          "수원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니까?",
        postTime: "3hours ago",
        replies: 0,
        replie: [],
      },
      {
        commentId: 2,
        profile: DummyUsers[0],
        likes: [3, false],
        content:
          "수원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니까?",
        postTime: "3hours ago",
        replies: 0,
        replie: [],
      },
    ],
  },
  {
    commentId: 2,
    profile: DummyUsers[0],
    likes: [3, false],
    content: "이사람 찐임?",
    postTime: "3hours ago",
    replies: 0,
    replie: [
      {
        commentId: 1,
        profile: DummyUsers[0],
        likes: [3, false],
        content:
          "수원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니까?",
        postTime: "3hours ago",
        replies: 0,
        replie: [],
      },
      {
        commentId: 2,
        profile: DummyUsers[0],
        likes: [3, false],
        content: "수원 화성말입니까? 저도 동의합니다.",
        postTime: "3hours ago",
        replies: 0,
        replie: [],
      },
    ],
  },
  {
    commentId: 3,
    profile: DummyUsers[1],
    likes: [3, false],
    content: "일로머스크는 화성갑니다.",
    postTime: "5hours ago",
    replies: 0,
    replie: [
      {
        commentId: 1,
        profile: DummyUsers[0],
        likes: [3, false],
        content:
          "수원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니까?",
        postTime: "3hours ago",
        replies: 0,
        replie: [],
      },
      {
        commentId: 2,
        profile: DummyUsers[0],
        likes: [3, false],
        content:
          "수원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니까?",
        postTime: "3hours ago",
        replies: 0,
        replie: [],
      },
    ],
  },
  {
    commentId: 4,
    profile: DummyUsers[1],
    likes: [3, false],
    content: "엉 뉴스에도 나왔네",
    postTime: "5hours ago",
    replies: 0,
    replie: [
      {
        commentId: 1,
        profile: DummyUsers[0],
        likes: [3, false],
        content:
          "수원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니까?",
        postTime: "3hours ago",
        replies: 0,
        replie: [],
      },
      {
        commentId: 2,
        profile: DummyUsers[0],
        likes: [3, false],
        content:
          "수원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니까?",
        postTime: "3hours ago",
        replies: 0,
        replie: [],
      },
      {
        commentId: 3,
        profile: DummyUsers[0],
        likes: [3, false],
        content:
          "수원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니원 화성말입니까?",
        postTime: "3hours ago",
        replies: 0,
        replie: [],
      },
    ],
  },
];
export const dummy = {
  background: "/img/project/Azuki.png",
  profile: "/img/project/Doodles.png",
};
export const raffleDummy = {
  profile: "/img/project/Bored_Ape_Yacht_Club.png",
};

export const DummyPost: PostState = {
  postId: 1,
  typeId: PostStatus.ANCEMENT,
  postTime: "3hours ago",
  community: CommunityProfiles[1],
  profile: DummyUsers[0],
  content: "Now NFT Platform is so distracted. We need to solve this problem",
  imgs: null,
  likes: [3, false],
  comments: 4, //comment갯수
  condition: DummyAuth,
  raffle: null,
  vote: null,
  comment: dummyComments,
};

export const DummyPosts: PostState[] = [
  {
    postId: 1,
    typeId: PostStatus.ANCEMENT,
    postTime: "3hours ago",
    community: CommunityProfiles[1],
    profile: DummyUsers[0],
    content: "Now NFT Platform is so distracted. We need to solve this problem",
    imgs: null,
    likes: [3, false],
    comments: 4, //comment갯수
    condition: DummyAuth,
    raffle: null,
    vote: null,
    comment: dummyComments,
  },
  {
    postId: 2,
    typeId: PostStatus.ANCEMENT,
    postTime: "3hours ago",
    community: CommunityProfiles[1],
    profile: DummyUsers[0],
    content: "NFT시장은 스캠으로 가득차있다.",
    imgs: null,
    likes: [3, true],
    comments: 0, //comment갯수
    condition: DummyAuth,
    vote: null,
    raffle: dummyRaffle,
    sharedPost: DummyPost,
    comment: dummyComments,
  },
  {
    postId: 3,
    typeId: PostStatus.ANCEMENT,
    postTime: "4hours ago",
    community: CommunityProfiles[1],
    profile: DummyUsers[0],
    content: "    커뮤니티 \n어케들가요?",
    imgs: null,
    likes: [3, false],
    comments: 0, //comment갯수
    condition: DummyAuth,
    raffle: null,
    vote: null,
    comment: dummyComments,
  },
  {
    postId: 4,
    typeId: PostStatus.ANCEMENT,
    postTime: "4hours ago",
    community: CommunityProfiles[1],
    profile: DummyUsers[1],
    content: "와 지갑에 nft들어옴 ㅋㅋ",
    imgs: null,
    likes: [3, false],
    comments: 0, //comment갯수
    condition: DummyAuth,
    raffle: null,
    vote: null,
    comment: dummyComments,
  },
  {
    postId: 5,
    typeId: PostStatus.ANCEMENT,
    postTime: "5hours ago",
    community: CommunityProfiles[1],
    profile: DummyUsers[2],
    content: "이게뭐야.\n 으아아 \rasdf\r\nadsf",
    imgs: null,
    likes: [3, false],
    comments: 0, //comment갯수
    condition: DummyAuth,
    raffle: null,
    vote: null,
    comment: dummyComments,
  },
  {
    postId: 6,
    typeId: PostStatus.ANCEMENT,
    postTime: "5hours ago",
    community: CommunityProfiles[1],
    profile: DummyUsers[2],
    content: "화성 갈끄니까~",
    imgs: null,
    likes: [3, false],
    comments: 0, //comment갯수
    condition: DummyAuth,
    raffle: null,
    vote: null,
    comment: dummyComments,
  },
];
export default dummy;

export const dummyDao = {
  community: CommunityProfileArray[0],
  proposerProfile: DummyUsers[0],
  description: "Can I withdraw 1000usdt token for development costs?",
  title: "Withdraw money for our project",
  voteContract: "0xfF7A2D2Ed4557E2BfEbB3bcC81e4Db7855978382",
  condition: AccessStatus.HOLDER,
  status: "in progress",
  voted: false,
  start: new Date("2022-12-6T03:24:00"),
  due: new Date("2022-12-17T03:24:00"),
  daoItems: {
    "Sure why not?": 132,
    "Nope.": 112,
  },
  commuWalletAdress: "0x3b718ef8ca9582be1df8665c1dbeb93b88842ffa",
  receivWalletAddress: "0xa5a930e03cd0379962c5babbd88ecf125d71a4ab",
  TxHash: "0xea3081c9cc8ad5916a74e19e81ff86df4e1e73a86518bf3a42b6e42ba1811286",
  TxHashDots: "0xea3081c9cc8ad5916a74e19e8...",
  block: 98507,
};

export const dummyWallet = {
  walletAdress: 0x3b718ef8ca9582be1df8665c1dbeb93b88842ffa,
};
