import { Common } from '@custom/common.entity';
import { Entity, ManyToOne, Column, OneToMany } from 'typeorm';
import { Community, User, UserRole } from '.';

@Entity()
export class UserCommunity extends Common {
  @ManyToOne((type) => User, (user) => user.userCommunities, { eager: true })
  user: User;

  @ManyToOne((type) => Community, (community) => community.userCommunities, {
    eager: true,
  })
  community: Community;

  @OneToMany((type) => UserRole, (UserRole) => UserRole.userCommunity)
  userRoles: UserRole[];

  @Column({
    type: 'boolean',
    default: false,
  })
  holder: boolean;

  @Column()
  level: number;
}
