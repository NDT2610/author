import { Column, Entity,JoinColumn,OneToOne,PrimaryGeneratedColumn } from "typeorm";
import { User } from "./Users";

@Entity()
export class Profile {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({default: null})
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  age: number;

  @Column()
  address: string;

  @Column({ default: 'other' }) 
  gender: string;

  @Column({default: null})
  userId: number

  @OneToOne(() => User)
  @JoinColumn({name: 'userId', referencedColumnName: 'user_id'}) 
  user: User
}
