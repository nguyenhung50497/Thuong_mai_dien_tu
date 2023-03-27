import { text } from "express";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
   @PrimaryGeneratedColumn()
   idProduct: number;
   @Column({ default: "" })
   nameProduct: string;
   @Column({ type: "text" })
   description: string;
   @Column()
   price: number;
   @Column({ type: "text" })
   image: string;
   @Column({ default: 0 })
   quantity: number;
   @Column({ default: 0 })
   sold: number;
   @Column()
   idCategory: number;
   @Column()
   idShop: number;
   @Column()
   timePost: string;
}
