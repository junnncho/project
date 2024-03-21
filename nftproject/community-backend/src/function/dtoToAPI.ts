import { Post, Comment, Reply, User } from '@entity';
import { userInfo } from 'os';
import {
  GetPostsAPI,
  GetCommentsAPI,
  GetRepliesAPI,
  GetProfileAPI,
  PostStatus,
  UNAUTHORIZED,
  EditedPost,
} from '@type';

// export const PostConvert = (posts: Post[]): GetPostsAPI[] => {
//   return posts.map((item) => {
//     const temp = <GetPostsAPI>{};
//     temp['postId'] = item.id;
//     temp['community'] = {
//       id: item.community.id,
//       name: item.community.name,
//       img: item.community.profile_img?.url,
//     };
//     temp['profile'] = {
//       id: item.user.id,
//       img: item.user.profile_img?.url,
//       name: item.user.nickname,
//     };
//     temp['content'] = item.content;
//     temp['imgs'] = item.imgs.map((elmt) => elmt.url);
//     temp['likes'] = [item.likes, false];
//     temp['comments'] = item.comments ? item.comments.length : 0;
//     temp['condition'] = item.condition;
//     temp['postTime'] = item.createdAt;
//     if (item.sharePost) {
//       temp['sharedPost'] = <GetPostsAPI>{};
//       temp['sharedPost']['postId'] = item.sharePost.id;
//       temp['sharedPost']['community'] = {
//         id: item.sharePost.community.id,
//         name: item.sharePost.community.name,
//         img: item.sharePost.community.profile_img?.url,
//       };
//       temp['sharedPost']['profile'] = {
//         id: item.sharePost.user.id,
//         img: item.sharePost.user.profile_img?.url,
//         name: item.sharePost.user.nickname,
//       };
//       temp['sharedPost']['content'] = item.sharePost.content;
//       temp['sharedPost']['imgs'] = item.sharePost.imgs.map((elmt) => elmt.url);
//       temp['sharedPost']['likes'] = [item.sharePost.likes, false];
//       temp['sharedPost']['comments'] = item.sharePost.comments
//         ? item.sharePost.comments.length
//         : 0;
//       temp['sharedPost']['condition'] = item.sharePost.condition;
//       temp['sharedPost']['postTime'] = item.sharePost.createdAt;
//     }
//     return temp;
//   });
// };

// export const CommentConvert = (comments: Comment[]): GetCommentsAPI[] => {
//   return comments.map((item) => {
//     const temp = <GetCommentsAPI>{};
//     temp['commentId'] = item.id;
//     temp['profile'] = {
//       id: item.user.id,
//       img: item.user.profile_img?.url,
//       name: item.user.nickname,
//     };
//     temp['content'] = item.content;
//     temp['likes'] = [item.likes, false];
//     temp['replies'] = item.replies ? item.replies.length : 0;
//     temp['postTime'] = item.createdAt;
//     return temp;
//   });
// };

// export const ReplyConvert = (replies: Reply[]): GetRepliesAPI[] => {
//   return replies.map((item) => {
//     const temp = <GetRepliesAPI>{};
//     temp['replyid'] = item.id;
//     temp['profile'] = {
//       id: item.user.id,
//       img: item.user.profile_img?.url,
//       name: item.user.nickname,
//     };
//     temp['content'] = item.content;
//     temp['likes'] = [item.likes, false];
//     temp['postTime'] = item.createdAt;
//     return temp;
//   });
// };

export const ProfileConvert = (user: User, version: 1 | 2): GetProfileAPI => {
  const temp = <GetProfileAPI>{};
  temp['profile'] = {
    id: user.id,
    img: user.profile_img?.url,
    name: user.nickname,
  };
  const items = user?.userCommunities;
  switch (version) {
    case 1:
      items &&
        (temp['communities'] = items.map((item) => ({
          id: item.community.id,
          name: item.community.name,
          img: item.community.profile_img?.url,
          holder: item.holder,
        })));
      break;
    case 2:
      temp['communities'] = items ? items.length : 0;
      user?.banner_img && (temp['bannerImg'] = user.banner_img?.url);
      break;
    default:
      break;
  }
  temp['description'] = user.description ? user.description : '';
  temp['nfts'] = user.nfts ? user.nfts.length : 0;
  temp['wallet'] = user.account;

  return temp;
};

export const PostConvert = (item: EditedPost): GetPostsAPI => {
  const temp = <GetPostsAPI>{};
  temp['postId'] = item.id;
  temp['typeId'] = item.postState?.page ? PostStatus.ANCEMENT : PostStatus.KR;
  temp['community'] = {
    id: item.community.id,
    name: item.community.name,
    img: item.community.profile_img?.url,
  };
  temp['profile'] = {
    id: item.user.id,
    img: item.user.profile_img?.url,
    name: item.user.nickname,
  };
  temp['content'] = item.content;
  temp['imgs'] = item.imgs.map((elmt) => [elmt.id, elmt.url]);
  temp['likes'] = [item.likes, false];
  temp['comments'] = item.comments ? item.comments.length : 0;
  temp['condition'] = item.condition;
  temp['postTime'] = item.createdAt;
  if (item.sharePost) {
    if (item.sharePost === UNAUTHORIZED) {
      temp['sharedPost'] = UNAUTHORIZED;
    } else {
      temp['sharedPost'] = <GetPostsAPI>{};
      temp['sharedPost']['postId'] = item.sharePost.id;
      temp['sharedPost']['typeId'] = item.sharePost.postState?.page
        ? PostStatus.ANCEMENT
        : PostStatus.KR;
      temp['sharedPost']['community'] = {
        id: item.sharePost.community.id,
        name: item.sharePost.community.name,
        img: item.sharePost.community.profile_img?.url,
      };
      temp['sharedPost']['profile'] = {
        id: item.sharePost.user.id,
        img: item.sharePost.user.profile_img?.url,
        name: item.sharePost.user.nickname,
      };
      temp['sharedPost']['content'] = item.sharePost.content;
      temp['sharedPost']['imgs'] = item.sharePost.imgs.map((elmt) => [
        elmt.id,
        elmt.url,
      ]);
      temp['sharedPost']['likes'] = [item.sharePost.likes, false];
      temp['sharedPost']['comments'] = item.sharePost.comments
        ? item.sharePost.comments.length
        : 0;
      temp['sharedPost']['condition'] = item.sharePost.condition;
      temp['sharedPost']['postTime'] = item.sharePost.createdAt;
    }
  }
  return temp;
};

export const CommentConvert = (item: Comment): GetCommentsAPI => {
  const temp = <GetCommentsAPI>{};
  temp['commentId'] = item.id;
  temp['profile'] = {
    id: item.user.id,
    img: item.user.profile_img?.url,
    name: item.user.nickname,
  };
  temp['content'] = item.content;
  temp['likes'] = [item.likes, false];
  temp['replies'] = item.replies ? item.replies.length : 0;
  temp['postTime'] = item.createdAt;
  return temp;
};

export const ReplyConvert = (item: Reply): GetRepliesAPI => {
  const temp = <GetRepliesAPI>{};
  temp['replyid'] = item.id;
  temp['profile'] = {
    id: item.user.id,
    img: item.user.profile_img?.url,
    name: item.user.nickname,
  };
  temp['content'] = item.content;
  temp['likes'] = [item.likes, false];
  temp['postTime'] = item.createdAt;
  return temp;
};
