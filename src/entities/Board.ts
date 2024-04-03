import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from './Users';
import { List } from './List';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  board_id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: null }) // Default value is null
  created_by: number; // Change the type to number (user_id)

  @Column({default: 'Public'})
  type: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'created_by', referencedColumnName: 'user_id' }) // Referenced column in the User entity
  user: User; // Define a property for the User entity, if needed
  

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToMany(() => List, list => list.board)
  lists: List[];
}
