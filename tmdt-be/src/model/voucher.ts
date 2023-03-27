import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Voucher {
   @PrimaryGeneratedColumn()
   idVoucher: number;
   @Column()
   valueVoucher: number;
   @Column({ default: "" })
   dayStart: string;
   @Column({ default: "" })
   dayEnd: string;
   @Column()
   idProduct: number;
}
