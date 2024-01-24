import { Router, Request, Response } from "express";
import { WalletController } from "../controller/WalletController";
import { WalletDTO } from "../DTO/WalletDTO";

const router = Router();

router.get("/wallet", (req: Request, res: Response) => {
    const walletController = new WalletController();
    walletController.getUserWallet(req.body.user)
})

router.post("/wallet", (req: Request, res: Response) => {
    const walletController = new WalletController();
    walletController.newWallet(new WalletDTO(
        null,
        req.body.type_Coin,
        req.body.quantity,
        req.body.user
    ));
})

router.post("/wallet/convert", (req: Request, res: Response) => {
    const walletController = new WalletController();
    walletController.convertCoin(
        req.body.quantity,
        req.body.oldType,
        req.body.newType,
        req.body.userId,
    )
})

router.get("/wallet/:userId/total",(req: Request, res: Response) => {
    const walletController = new WalletController();
    walletController.totalUserMoney(req.params.userId);
} )

router.get("/wallet/:userId/:coin", (req: Request, res: Response) => {
    const walletController = new WalletController();
    walletController.totalInOneCoin(req.params.userId, req.params.coin);
})

export { router }
