import { Post, Comment, User } from './';
import { Common } from '@custom/common.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Reply extends Common {
  @Column()
  content: string;

  @Column()
  likes: number;

  @ManyToOne((type) => Post, (post) => post.replies)
  post: Post;

  @ManyToOne((type) => Comment, (comment) => comment.replies)
  comment: Comment;

  @ManyToOne((type) => User, (user) => user.replies)
  user: User;
}
