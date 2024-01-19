import { AppDataSource } from "./model/data-source"
import { User } from "./model/entity/User"
import { router as userRoute } from "./view/userRoute"
import { router as walletRoute } from "./view/walletRoute"
import express, { json } from "express"

const server = express();
server.use(json());
import cors from 'cors';


AppDataSource.initialize().then(async () => {
    server.listen(3000, () => {
        console.log('ouvindo');
    })
    server.use(cors());

    server.use('/api', userRoute);
    server.use('/api', walletRoute)


}).catch(error => console.log(error))
