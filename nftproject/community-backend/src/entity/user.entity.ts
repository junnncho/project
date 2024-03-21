import {
  Column,
  Entity,
  OneToMany,
  Unique,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Img, Post, NFT, Comment, Reply, UserRaffle, UserCommunity } from '.';
import { Common } from '@custom/common.entity';

@Entity()
@Unique(['account', 'nickname'])
export class User extends Common {
  @Column({ unique: true })
  account: string;

  @Column()
  nickname: string;

  @Column()
  description: string;

  @Column({ type: 'boolean', default: false })
  admin: boolean;

  @Column()
  discord: string;

  @Column()
  instagram: string;

  @Column()
  twitter: string;

  @OneToMany((type) => Post, (post) => post.user)
  posts: Post[];

  @OneToMany((type) => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany((type) => Reply, (reply) => reply.user)
  replies: Reply[];

  @OneToMany((type) => NFT, (nft) => nft.user)
  nfts: NFT[];

  @OneToMany((type) => UserCommunity, (userCommunity) => userCommunity.user)
  userCommunities: UserCommunity[];

  @OneToMany((type) => UserRaffle, (userRaffle) => userRaffle.user)
  userRaffles: UserRaffle[];

  @OneToMany((type) => UserRaffle, (userRaffle) => userRaffle.moder)
  mods: UserRaffle[];

  @Column()
  level: number;

  @OneToOne((type) => Img, {
    nullable: true,
    cascade: ['update', 'insert'],
  })
  @JoinColumn({ name: 'bannerid' })
  banner_img: Img;

  @OneToOne((type) => Img, {
    nullable: true,
    cascade: ['update', 'insert'],
  })
  @JoinColumn({ name: 'profileid' })
  profile_img: Img;
}
