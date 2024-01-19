import { AppDataSource } from "../data-source";
import { Wallet } from "../entity/Wallet";

const walletRepository = AppDataSource.getRepository(Wallet);

export class WalletService{
    getUserWallet(userId){
        return walletRepository.find({
            where:{
                user:{id:userId}
            }
        })
    };

    newWallet(wallet){
        return walletRepository.save(wallet)
    }
}