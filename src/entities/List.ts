// src/lists/list.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Board } from './Board'; 
import { Card } from './Card'; 

@Entity()
export class List {
  @PrimaryGeneratedColumn()
  list_id: number;

  @Column()
  title: string;

  // Assuming many lists can belong to one board
  @ManyToOne(() => Board, board => board.lists)
  board: Board;

  // Assuming one list can have multiple cards
  @OneToMany(() => Card, card => card.list)
  cards: Card[];
}
