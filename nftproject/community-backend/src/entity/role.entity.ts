import { UserRole } from '.';
import { Common } from '@custom/common.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Role extends Common {
  @Column()
  name: string;

  @OneToMany((type) => UserRole, (userRole) => userRole.role)
  userRoles: UserRole[];
}
