import {
  BaseEntity,
  Entity,
  ManyToOne,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User, Raffle } from '.';

@Entity()
export class UserRaffle extends BaseEntity {
  @PrimaryGeneratedColumn({ unsigned: true })
  id: number;

  @ManyToOne((type) => User, (user) => user.userRaffles)
  user: User;

  @ManyToOne((type) => User, (moderator) => moderator.mods)
  moder: User;

  @ManyToOne((type) => Raffle, (raffle) => raffle.userRaffles)
  raffle: Raffle;
}
