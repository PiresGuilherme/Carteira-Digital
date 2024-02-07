import { AppDataSource } from "./model/data-source"
import { User } from "./model/entity/User"
import { router as userRoute } from "./view/userRoute"
import { router as walletRoute } from "./view/walletRoute"
import express, { NextFunction, Request, Response, json } from "express"
import "express-async-errors"
const server = express();

import cors from 'cors';
import { AuthenticationMiddleware } from "./middleware/AuthenticationMiddleware"
import { BaseHttpException } from "./exceptions/BaseHttpException"

server.use(json());
server.use(cors());

server.use('/api', userRoute);
server.use('/api', walletRoute);

server.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        const exception = err as BaseHttpException;
        if (exception.statusCode) {
            return response.status(exception.statusCode).json({
                error: exception.message,
                errorCode: exception.errorCode,
            });
        }
        return response.status(500).json({ error: exception.message });
    }
);

AppDataSource.initialize().then(async () => {

    server.listen(3000, () => {
        console.log('ouvindo');
    })


}).catch(error => console.log(error))
