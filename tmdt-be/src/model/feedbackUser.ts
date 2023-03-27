import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class FeedbackUser {
    @PrimaryGeneratedColumn()
    idFeedback: number
    @Column()
    idProduct: number
    @Column({type: "varchar"})
    reviews: string;
    @Column()
    idUser: number
    @Column()
    assessment: string
    @Column()
    timeFeedback: string
}