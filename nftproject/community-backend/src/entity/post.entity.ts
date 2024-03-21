import { Reply, Community, Comment, Img, User, Raffle, PostState } from '.';
import { Common } from '@custom/common.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  JoinColumn,
  OneToOne,
  RelationId,
} from 'typeorm';
import { AccessStatus } from '@type';

@Entity()
export class Post extends Common {
  @Column()
  content: string;

  @Column()
  likes: number;

  @ManyToOne((type) => User, (user) => user.posts)
  @JoinColumn({ name: 'userid' })
  user: User;

  @Column({
    type: 'enum',
    enum: AccessStatus,
    default: AccessStatus.PUBLIC,
  })
  condition: AccessStatus;

  //   @ManyToOne((type) => Raffle, (raffle) => raffle.posts, { eager: true })
  //   raffle: Raffle;

  @ManyToOne((type) => Community, (community) => community.posts)
  @JoinColumn({ name: 'community_id' })
  community: Community;

  @ManyToOne((type) => Raffle, (raffle) => raffle.posts)
  raffle: Raffle;

  @ManyToOne((type) => PostState, (postState) => postState.posts, {})
  @JoinColumn({ name: 'post_state_id' })
  postState: PostState;

  @OneToMany((type) => Comment, (comment) => comment.post)
  comments: Comment[];

  @OneToMany((type) => Reply, (reply) => reply.post)
  replies: Reply[];

  @OneToMany((type) => Img, (img) => img.post, {
    cascade: ['insert', 'update', 'remove'],
  })
  imgs: Img[];

  @RelationId((post: Post) => post.user)
  userid: number;

  @ManyToOne((type) => Post, (share) => share.id, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  sharePost: Post;
}
