import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Notification {
    @PrimaryGeneratedColumn()
    idNotification: number
    @Column()
    idSender: number
    @Column()
    idReceiver: number;
    @Column()
    contentNotification: string
    @Column({default: 'chuadoc'})
    statusNotification: string
    @Column({default: 0})
    idCart: number
    @Column({default: 0})
    idProduct: number
}