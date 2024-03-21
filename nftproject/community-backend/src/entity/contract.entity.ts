import { Community, NFT, Img } from './';
import { Common } from '@custom/common.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  JoinColumn,
  Unique,
} from 'typeorm';

@Entity()
@Unique(['account'])
export class Contract extends Common {
  @Column()
  account: string;

  @ManyToOne((type) => Community, (community) => community.contracts)
  community: Community;

  @OneToMany((type) => NFT, (nft) => nft.contract)
  nfts: NFT[];

  @OneToOne((type) => Img, { nullable: true })
  @JoinColumn({ name: 'contractimg' })
  img: Img;
}
