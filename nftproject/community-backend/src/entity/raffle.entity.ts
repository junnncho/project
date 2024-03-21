import { Post, UserRaffle, Community } from '.';
import { Common } from '@custom/common.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Raffle extends Common {
  @Column()
  content: string;

  @Column()
  condition: string;

  @OneToMany((type) => Post, (post) => post.raffle)
  posts: Post[];

  @OneToMany((type) => UserRaffle, (userRaffle) => userRaffle.raffle)
  userRaffles: UserRaffle[];

  @ManyToOne((type) => Community, (community) => community.raffles)
  community: Community;
}
