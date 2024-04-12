// src/users/user.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany, OneToOne  } from 'typeorm';
import { Board } from './Board'; // Assuming you have a Board entity
import { Profile } from './Profile';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  user_id: number;

  @Column({unique: true})
  username: string;

  @Column({unique: true})
  email: string;

  @Column()
  password: string;

  // Assuming one user can have multiple boards
  @OneToMany(() => Board, board => board.created_by)
  boards: Board[];

  @OneToOne(() => Profile, (profile) => profile.userId) // specify inverse side as a second parameter
  profile: Profile
}
