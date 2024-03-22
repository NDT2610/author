// src/cards/card.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { List } from './List'; 

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  card_id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  // Assuming many cards can belong to one list
  @ManyToOne(() => List, list => list.cards)
  list: List;
}
