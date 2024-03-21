import { Raffle, Post, UserCommunity, Contract, Img, NFT, Role } from '.';
import { Common } from '@custom/common.entity';
import {
  Column,
  Entity,
  Unique,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
@Unique(['name'])
export class Community extends Common {
  @Column()
  name: string;

  @Column()
  description: string;

  @OneToMany((type) => Post, (post) => post.community)
  posts: Post[];

  @OneToMany((type) => Raffle, (raffle) => raffle.community)
  raffles: Raffle[];

  @OneToMany(
    (type) => UserCommunity,
    (userCommunity) => userCommunity.community,
  )
  userCommunities: UserCommunity[];

  @OneToMany((type) => Contract, (contract) => contract.community, {
    cascade: ['insert', 'update'],
  })
  contracts: Contract[];

  @OneToMany((type) => NFT, (nft) => nft.community)
  nfts: NFT[];

  @OneToOne((type) => Img, {
    nullable: true,
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'bannerid' })
  banner_img: Img;

  @OneToOne((type) => Img, {
    nullable: true,
    cascade: ['insert', 'update'],
  })
  @JoinColumn({ name: 'profileid' })
  profile_img: Img;
}
