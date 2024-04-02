import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn} from 'typeorm';
import { Board } from './Board'; 
import { Card } from './Card'; 

@Entity()
export class List {
  @PrimaryGeneratedColumn()
  list_id: number;

  @Column()
  title: string;

  @Column()
  board_id: number;

  @Column({default: 0})
  orderlist: number;

  // Assuming many lists can belong to one board
  @ManyToOne(() => Board, board => board.lists)
  @JoinColumn({ name: 'board_id' }) // Specify the foreign key column name
  board: Board;

  // Assuming one list can have multiple cards
  @OneToMany(() => Card, card => card.list)
  @JoinColumn({ name: 'list_id' }) // Specify the foreign key column name
  cards: Card[];

}
