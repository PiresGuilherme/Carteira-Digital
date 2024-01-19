import { WalletDTO } from "../DTO/WalletDTO";
import { Wallet } from "../model/entity/Wallet";
import { WalletService } from "../model/service/WalletService";

export class WalletController{
    async getUserWallet(userId){
        try {

            const walletService = new WalletService();
            const response = await walletService.getUserWallet(userId);
            
        } catch (error) {
            
        }
    }

    async newWallet(walletDTO:WalletDTO){
        const walletService = new  WalletService();
        const newWallet = walletDTO.toModel();

        const response = await walletService.newWallet(newWallet);
        return WalletDTO.fromModel(response)
    }
}