import { WalletDTO } from "../DTO/WalletDTO";
import { Wallet } from "../model/entity/Wallet";
import axios from 'axios';
import { WalletService } from "../model/service/WalletService";


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
        const newWallet = walletDTO.toModel();

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
            throw error;
        }
    }

    async convertCoin(quantity, oldType, newType, userId) {
        try {
            const walletService = new WalletService();
            const price = await axios.get(`https://economia.awesomeapi.com.br/last/${oldType}-${newType}`)
            const totalCoins = await walletService.totalValueWallet(`${oldType}`, userId);

            if (quantity > totalCoins) {
                return;
            }
            const convertedValue = quantity * price.data[`${oldType}${newType}`].high;
            await walletService.newWallet({
                type_Coin: newType,
                quantity: convertedValue,
                user: userId
            });

            await walletService.newWallet({
                type_Coin: oldType,
                quantity: -quantity,
                user: userId
            })
            console.log('Conversão concluída.');
        } catch (error) {
            console.error('Erro ao converter moeda:', error);
            throw error;
        }
    }

    async totalUserMoney(userId) {
        const walletController = new WalletController();
        var userCoins = await walletController.getUserWallet(userId);
        var total:number = 0;

        for (const transaction of userCoins){ 
            if(transaction.type_Coin == "BRL") {
                total += Number(transaction.quantity)
            } else{
            const price = await axios.get(`https://economia.awesomeapi.com.br/last/${transaction.type_Coin}-BRL`)

            total += Number(transaction.quantity * price.data[`${transaction.type_Coin}BRL`].high);
        }}
        console.log(total);
    }
    
        
        
    
}