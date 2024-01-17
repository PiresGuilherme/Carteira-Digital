import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne } from "typeorm"
import { User } from "./User";

export enum typeCoin {
    'EUR',
    'USD',
    'BRL'
}
@Entity()
export class Wallet {

    @PrimaryGeneratedColumn()
    id: number

    @Column({type: 'enum',
    enum: typeCoin,
    default:typeCoin.BRL
})
    type_Coin: typeCoin;

    @Column()
    quantity : number;

    @ManyToOne(()=> User,user=> user.wallet)
    user:User[]

}
