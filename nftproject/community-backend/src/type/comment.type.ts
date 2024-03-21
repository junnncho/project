import { IsNotEmpty } from 'class-validator';
import { Img } from '@entity';

export class CreateCommentDto {
  @IsNotEmpty()
  postid: number;

  @IsNotEmpty()
  content: string;
}

export class CreateReplyDto {
  //   @IsNotEmpty()
  //   postid: number;

  @IsNotEmpty()
  commentid: number;

  @IsNotEmpty()
  content: string;
}

export class GetCommentsAPI {
  commentId: number;
  profile: { id: number; img: string | null; name: string };
  content: string;
  likes: [number, boolean];
  postTime: string;
  replies: number;
}

export class GetRepliesAPI {
  replyId: number;
  profile: { id: number; img: string | null; name: string };
  content: string;
  likes: [number, boolean];
  postTime: string;
}
