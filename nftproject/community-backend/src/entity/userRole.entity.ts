import { BaseEntity, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { UserCommunity, Role } from '.';

@Entity()
export class UserRole extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @ManyToOne(
    (type) => UserCommunity,
    (userCommunity) => userCommunity.userRoles,
    { eager: true },
  )
  userCommunity: UserCommunity;

  @ManyToOne((type) => Role, (role) => role.userRoles, {
    eager: true,
  })
  role: Role;
}
