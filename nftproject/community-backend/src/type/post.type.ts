import {
  IsNotEmpty,
  ArrayMaxSize,
  IsString,
  IsOptional,
  IsInt,
  IsNumber,
  isArray,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { Img, Post } from '@entity';

export enum AccessStatus {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
  HOLDER = 'HOLDER',
}
export type UNAUTHORIZED = 'UNAUTHORIZED';
export const UNAUTHORIZED = 'UNAUTHORIZED';
export enum PostStatus {
  ANCEMENT = 'ANNOUNCEMENT',
  KR = 'KR',
  ENG = 'ENG',
}
export interface EditedPost extends Omit<Post, 'sharePost'> {
  sharePost: UNAUTHORIZED | Post;
}

export enum PlaceStatus {
  PROFILE = 'PROFILE',
  COMMU = 'COMMUNITY',
  TOTAL = 'TOTAL',
}

export class CreateBoardDto {
  @IsNotEmpty()
  type?: PostStatus;

  @IsNotEmpty()
  @Transform(({ value }) => parseInt(value))
  communityId: number;

  @IsNotEmpty()
  content: string;

  @IsOptional()
  @ArrayMaxSize(3)
  imgs: string[];

  @IsOptional()
  @IsString()
  condition: AccessStatus;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  shareId: number;
}

export class UpdateBoardDto {
  // @IsNotEmpty()
  // @Transform(({ value }) => parseInt(value))
  // communityId: number;

  @IsNotEmpty()
  content: string;

  @IsOptional()
  @ArrayMaxSize(3)
  imgs: string[];

  @IsOptional()
  @Type(() => Number)
  @Transform(({ value }) => (isArray(value) ? value : [value]))
  @IsNumber({}, { each: true })
  filesIndex: number[];

  @IsOptional()
  @IsString()
  condition: AccessStatus;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  shareId: number;
}

export class GetBoardDto {
  @IsOptional()
  @IsInt()
  // @Transform({ value } => Number.parseInt(value))
  offset: number | null;

  @IsOptional()
  @IsInt()
  // @Transform({ value } => Number.parseInt(value))
  limit = 10;

  type: PostStatus | null;
}

export class GetPostsAPI {
  postId: number;
  typeId: PostStatus;
  community: {
    id: number;
    name: string;
    img: string | undefined;
  };
  profile: { id: number; img: string | undefined; name: string };
  content: string;
  imgs: [number, string][];
  likes: [number, boolean];
  comments: number;
  condition: AccessStatus;
  postTime: string;
  sharedPost?: GetPostsAPI | UNAUTHORIZED;
}
