import { Post } from '.';
import { Common } from '@custom/common.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { PostStatus } from '@type';

@Entity()
export class PostState extends Common {
  @Column({ type: 'enum', enum: PostStatus })
  page: PostStatus;

  @OneToMany((type) => Post, (post) => post.postState)
  posts: Post[];
}
