import { Router,Request, Response } from "express";
import { WalletController } from "../controller/WalletController";
import { WalletDTO } from "../DTO/WalletDTO";

const router = Router();

router.get("/wallet",(req:Request, res:Response)=>{
    const walletController = new WalletController();
    walletController.getUserWallet(req.body.user)
})

router.post("/wallet",(req:Request,res:Response)=>{
    const walletController = new WalletController();
    walletController.newWallet(new WalletDTO(
        null,
        req.body.type_Coin,
        req.body.quantity,
        req.body.user
    ));
})
export {router}
