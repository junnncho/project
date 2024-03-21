import { Post, Reply, User } from '.';
import { Common } from '@custom/common.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Comment extends Common {
  @Column()
  content: string;

  @Column()
  likes: number;

  @ManyToOne((type) => Post, (post) => post.comments)
  post: Post;

  @OneToMany((type) => Reply, (reply) => reply.comment)
  replies: Reply[];

  @ManyToOne((type) => User, (user) => user.comments)
  user: User;
}
