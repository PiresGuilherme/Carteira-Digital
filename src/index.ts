import { AppDataSource } from "./model/data-source"
import { User } from "./model/entity/User"
import { router as userRoute } from "./view/userRoute"
import { router as walletRoute } from "./view/walletRoute"
import express, { json } from "express"

const server = express();

import cors from 'cors';
import { AuthenticationMiddleware } from "./middleware/AuthenticationMiddleware"


AppDataSource.initialize().then(async () => {
    server.use(json());
    server.listen(3000, () => {
        console.log('ouvindo');
    })
    server.use(cors());

    server.use('/api', userRoute);

    // server.use(new AuthenticationMiddleware().validateAuthentication);
    server.use('/api', walletRoute);


}).catch(error => console.log(error))
