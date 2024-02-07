import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne } from "typeorm"
import { User } from "./User";

export type type_transaction= "credito" | "conversao" | "reembolso"

@Entity()
export class Wallet {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    type_Coin: string;

    @Column({ type: 'decimal'})
    quantity : number;

    @Column()
    createdAt: Date;

    @Column({
        type:"enum",
        enum: [ "credito", "conversao", "reembolso"],
        default: "credito"
    })
    type_transaction : type_transaction;

    @ManyToOne(()=> User,user=> user.wallet)
    user:User
}
