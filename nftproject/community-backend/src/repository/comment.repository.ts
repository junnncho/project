import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { CustomRepository } from '@custom/index';
import { AccessStatus, CreateCommentDto, GetBoardDto } from '@type';
import { Comment, User } from '@entity';

@CustomRepository(Comment)
export class CommentRepository extends Repository<Comment> {
  async createComment(
    createCommentDto: CreateCommentDto,
    user: User,
  ): Promise<Comment> {
    const comment = this.create({
      content: createCommentDto.content,
      likes: 0,
      post: { id: createCommentDto.postid },
      user: { id: user.id },
    });
    await this.save(comment);
    return comment;
  }

  async getUnitComment(user: User, id: number): Promise<Comment> {
    return this.findOne({
      where: [
        { id: id, post: { condition: AccessStatus.PUBLIC } },
        ...(user
          ? [
              {
                id: id,
                post: {
                  condition: AccessStatus.PRIVATE,
                  community: {
                    userCommunities: { user: { id: user.id } },
                  },
                },
              },
              {
                id: id,
                post: {
                  condition: AccessStatus.HOLDER,
                  id: id,
                  community: {
                    id: id,
                    userCommunities: { user: { id: user.id }, holder: true },
                  },
                },
              },
            ]
          : []),
      ],
      relations: {
        user: { profile_img: true },
        replies: true,
      },
      select: {
        id: true,
        user: { id: true, profile_img: { url: true }, nickname: true },
        content: true,
        likes: true,
        createdAt: true,
        replies: { id: true },
      },
    });
  }

  async getComments(
    getBoardDto: GetBoardDto,
    user: User,
    id: number,
  ): Promise<Comment[]> {
    return this.find({
      where: [
        { post: { condition: AccessStatus.PUBLIC, id: id } },
        ...(user
          ? [
              {
                post: {
                  condition: AccessStatus.PRIVATE,
                  id: id,
                  community: { userCommunities: { user: { id: user.id } } },
                },
              },
              {
                post: {
                  condition: AccessStatus.HOLDER,
                  id: id,
                  community: {
                    userCommunities: { user: { id: user.id }, holder: true },
                  },
                },
              },
            ]
          : []),
      ],
      relations: {
        user: { profile_img: true },
        replies: true,
      },
      select: {
        id: true,
        user: { id: true, profile_img: { url: true }, nickname: true },
        content: true,
        likes: true,
        createdAt: true,
        replies: { id: true },
      },
      order: {
        createdAt: 'ASC',
      },
      ...(getBoardDto.limit && { take: getBoardDto.limit }),
      ...(getBoardDto.offset && { skip: getBoardDto.offset }),
    });
  }
}
