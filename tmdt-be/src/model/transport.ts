import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Transport {
    @PrimaryGeneratedColumn()
    idTransport: number;
    @Column({ default: "" })
    nameTransport: string;
}