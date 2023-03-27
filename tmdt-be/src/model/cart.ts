import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cart {
   @PrimaryGeneratedColumn()
   idCart: number;
   @Column()
   idUser: number;
   @Column({ default: "chưa thanh toán" })
   statusCart: string;
   @Column({ default: "" })
   timePayCart: string;
   @Column({default: 0})
   idAddressUser: number;
}
