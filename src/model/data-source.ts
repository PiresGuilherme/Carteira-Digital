import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User"
import { Wallet } from "./entity/Wallet"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "Senac@2021",
    database: "DigitalWallet",
    synchronize: true,
    logging: false,
    entities: [User,Wallet],
    migrations: [],
    subscribers: [],
})
