import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, ManyToOne } from "typeorm"
import { User } from "./User";

// export enum typeCoin {
//     "EUR",
//     "USD",
//     "BRL"
// }
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

    @ManyToOne(()=> User,user=> user.wallet)
    user:User
}
