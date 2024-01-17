import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Wallet } from "./Wallet"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    firstName: string

    @Column()
    age: number

    @OneToMany(()=> Wallet, wallet => wallet.user)
    wallet: Wallet;
}
