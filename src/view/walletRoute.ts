import express, { Router, Request, Response, NextFunction } from "express";
import "express-async-errors";
import { WalletController } from "../controller/WalletController";
import { WalletDTO } from "../DTO/WalletDTO";
import { AuthenticationMiddleware } from "../middleware/AuthenticationMiddleware";
import { BaseHttpException } from "../exceptions/BaseHttpException";


const router = Router();

router.use(new AuthenticationMiddleware().validateAuthentication);

router.get("/wallet", async (req: Request, res: Response) => {
    const walletController = new WalletController();
    await walletController.getUserWallet(req.body.user)
})

router.post("/wallet", async (req: Request, res: Response) => {
    const walletController = new WalletController();
    await walletController.newWallet(new WalletDTO(
        null,
        req.body.type_Coin,
        req.body.quantity,
        "credito",
        req.body.user
    ));
})

router.post("/wallet/convert", async(req: Request, res: Response) => {
    const walletController = new WalletController();
    await walletController.convertCoin(
        req.body.quantity,
        req.body.oldType,
        req.body.newType,
        req.body.userId,
    )
})

router.get("/wallet/reimbursement/:transactionId", async (req:Request, res: Response) => {
    const walletController = new WalletController();
    await walletController.reimbursement(req, res);
})
router.get("/wallet/:userId/total", async (req: Request, res: Response) => {
    const walletController = new WalletController();
    await walletController.totalUserMoney(req.params.userId);
} )

router.get("/wallet/:userId/:coin", async (req: Request, res: Response) => {
    const walletController = new WalletController();
    await walletController.totalInOneCoin(req.params.userId, req.params.coin);
})


// router.use(
//     (err: Error, request: Request, response: Response, next: NextFunction) => {
//       const exception = err as BaseHttpException;
//       if (exception.statusCode) {
//         return response.status(exception.statusCode).json({
//           error: exception.message,
//           errorCode: exception.errorCode,
//         });
//       }
//       return response.status(500).json({ error: exception.message });
//     }
//   );

export { router }
