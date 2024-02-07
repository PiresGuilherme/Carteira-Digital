import { WalletDTO } from "../DTO/WalletDTO";
import { Wallet } from "../model/entity/Wallet";
import axios from 'axios';
import { WalletService } from "../model/service/WalletService";
import { SessionController } from "./SessionController";
import { ImpossibleConversion } from "../exceptions/ImpossibleConversion";
import { Request, Response } from "express";
import { UserService } from "../model/service/UserSevice";


export class WalletController {
    async getUserWallet(userId) {
        try {
            const walletService = new WalletService();
            const response = await walletService.getUserWallet(userId);
            console.log(response);

            return response
        } catch (error) {

        }
    }

    async newWallet(walletDTO: WalletDTO) {
        const walletService = new WalletService();
        const userService = new UserService
        const newWallet = walletDTO.toModel();
        console.log();
        newWallet.user = await userService.getUserById(newWallet.user);
        
        const response = await walletService.newWallet(newWallet);
        return WalletDTO.fromModel(response)
    }

    async totalInOneCoin(userId, type) {
        try {
            const walletService = new WalletService();
            const totalCoins = await walletService.totalValueWallet(`${type}`, userId);
            console.log(totalCoins);
            return totalCoins
        } catch (error) {
            console.error('Erro ao converter moeda:', error);
            throw new ImpossibleConversion("Não é possível fazer a conversão!");
        }
    }

    async convertCoin(quantity, oldType, newType, userId) {
        const walletService = new WalletService();
        const price = await axios.get(`https://economia.awesomeapi.com.br/last/${oldType}-${newType}`)
        const totalCoins = await walletService.totalValueWallet(`${oldType}`, userId);
        if (price.data.status) {
            throw new ImpossibleConversion("Não é possível fazer a conversão!");
        }

        if (quantity > totalCoins) {
            throw new ImpossibleConversion("Não é possível fazer a conversão!");
        }
        const convertedValue = quantity * price.data[`${oldType}${newType}`].high;
        await walletService.newWallet({
            type_Coin: newType,
            quantity: convertedValue,
            type_transaction: "conversao",
            user: userId
        });

        await walletService.newWallet({
            type_Coin: oldType,
            quantity: -quantity,
            type_transaction: "conversao",
            user: userId
        })
        console.log('Conversão concluída.');
    }


    async totalUserMoney(userId) {
        const walletController = new WalletController();
        var userCoins = await walletController.getUserWallet(userId);
        var total: number = 0;

        for (const transaction of userCoins) {
            if (transaction.type_Coin == "BRL") {
                total += Number(transaction.quantity)
            } else {
                const price = await axios.get(`https://economia.awesomeapi.com.br/last/${transaction.type_Coin}-BRL`)

                total += Number(transaction.quantity * price.data[`${transaction.type_Coin}BRL`].high);
            }
        }
        console.log(total);
    }

    async reimbursement(req: Request, res: Response) {
        const walletService = new WalletService();        
        const transaction = await walletService.getTransaction(req.params.transactionId);
        if (!transaction) {
            throw new ImpossibleConversion("Transação não existente!")
        }        
            
        const today = new Date()
        if (today.getTime()-transaction.createdAt.getTime() >= 604800000 ) {
            throw new ImpossibleConversion("Já se passaram 7 dias desde a transação, não é possível o reembolso.")
        }
        if (transaction.quantity > 0) {
            throw new ImpossibleConversion("Não é possível reembolsar um valor recebido.");
        }
        const reimbursement = await walletService.newWallet({
            type_Coin: transaction.type_Coin,
            quantity: Math.abs(transaction.quantity),
            type_transaction:"reembolso",
            user: transaction.user.id
        });
        return res.status(200).json(reimbursement);
    }

}