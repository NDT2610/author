import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Password {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;


  @Column({unique: true})
  token: string;
}