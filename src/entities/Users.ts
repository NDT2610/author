// src/users/user.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Board } from './Board'; // Assuming you have a Board entity

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
}
