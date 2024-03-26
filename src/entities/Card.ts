// src/cards/card.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { List } from './List'; 

@Entity()
export class Card {
  @PrimaryGeneratedColumn()
  card_id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column()
  list_id: number;
  // Assuming many cards can belong to one list
  @ManyToOne(() => List, list => list.cards)
  @JoinColumn({name: 'list_id'})
  list: List;
}
