import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import { Wallet } from "./Wallet"

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    age: number

    @Column({unique:true})
    email:string

    @Column()
    password: string

    @OneToMany(()=> Wallet, wallet => wallet.user)
    wallet: Wallet[];
}
