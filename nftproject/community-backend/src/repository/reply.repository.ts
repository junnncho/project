import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { CustomRepository } from '@custom/index';
import { Reply, User } from '@entity';
import { CreateReplyDto, GetBoardDto, AccessStatus } from '@type';

@CustomRepository(Reply)
export class ReplyRepository extends Repository<Reply> {
  async getUnitReply(user: User, id: number): Promise<Reply> {
    return this.findOne({
      where: [
        {
          id: id,
          comment: {
            post: {
              condition: AccessStatus.PUBLIC,
            },
          },
        },
        ...(user
          ? [
              {
                id: id,
                comment: {
                  post: {
                    condition: AccessStatus.PRIVATE,
                    community: { userCommunities: { user: { id: user.id } } },
                  },
                },
              },
              {
                id: id,
                comment: {
                  post: {
                    condition: AccessStatus.HOLDER,
                    community: {
                      userCommunities: { user: { id: user.id }, holder: true },
                    },
                  },
                },
              },
            ]
          : []),
      ],
      relations: {
        user: { profile_img: true },
      },
      select: {
        id: true,
        user: { id: true, profile_img: { url: true }, nickname: true },
        content: true,
        likes: true,
        createdAt: true,
      },
    });
  }

  async getReplies(
    getBoardDto: GetBoardDto,
    user: User,
    id: number,
  ): Promise<Reply[]> {
    return this.find({
      where: [
        { comment: { post: { condition: AccessStatus.PUBLIC }, id: id } },
        ...(user
          ? [
              {
                comment: {
                  post: {
                    condition: AccessStatus.PRIVATE,
                    community: { userCommunities: { user: { id: user.id } } },
                  },
                  id: id,
                },
              },
              {
                comment: {
                  post: {
                    condition: AccessStatus.HOLDER,
                    community: {
                      userCommunities: { user: { id: user.id }, holder: true },
                    },
                  },
                  id: id,
                },
              },
            ]
          : []),
      ],
      relations: {
        user: { profile_img: true },
      },
      select: {
        id: true,
        user: { id: true, profile_img: { url: true }, nickname: true },
        content: true,
        likes: true,
        createdAt: true,
      },
      order: {
        createdAt: 'ASC',
      },
      ...(getBoardDto.limit && { take: getBoardDto.limit }),
      ...(getBoardDto.offset && { skip: getBoardDto.offset }),
    });
  }

  async createReply(
    createReplyDto: CreateReplyDto,
    user: User,
  ): Promise<Reply> {
    const reply = this.create({
      content: createReplyDto.content,
      likes: 0,
      comment: { id: createReplyDto.commentid },
      user: { id: user.id },
    });
    await this.save(reply);
    return reply;
  }
}
