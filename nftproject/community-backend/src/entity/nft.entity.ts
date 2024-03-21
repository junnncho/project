import { Img, Community, User } from '.';
import { Common } from '@custom/common.entity';
import { Column, Entity, ManyToOne, OneToOne, JoinColumn } from 'typeorm';
import { Contract } from './contract.entity';

@Entity()
export class NFT extends Common {
  @OneToOne((type) => Img, { nullable: true })
  @JoinColumn({ name: 'nftid' })
  nft_img: Img;

  @ManyToOne((type) => Community, (community) => community.nfts)
  community: Community;

  @ManyToOne((type) => User, (user) => user.nfts)
  user: User;

  @ManyToOne((type) => Contract, (contract) => contract.nfts, {
    eager: true,
  })
  contract: Contract;
}
