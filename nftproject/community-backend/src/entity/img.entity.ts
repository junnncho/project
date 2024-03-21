import { Post } from '.';
import { Common } from '@custom/common.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Img extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @Column()
  url: string;

  @ManyToOne((type) => Post, (post) => post.imgs, { onDelete: 'CASCADE' })
  post: Post;
}
