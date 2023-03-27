import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  idUser: number;
  @Column({ default: "" })
  username: string;
  @Column({ default: "" })
  password: string;
  @Column({ default: "" })
  emailUser: string;
  @Column({ default: "" })
  fullName: string;
  @Column({ default: "" })
  phoneUser: string;
  @Column({ type: "text" })
  avatar: string;
  @Column({ default: "customer" })
  role: string;
  @Column({default: ''})
  idGoogle: string
}
