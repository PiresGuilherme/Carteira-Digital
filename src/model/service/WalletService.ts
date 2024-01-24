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
        wallet.createdAt = Date()
        return walletRepository.save(wallet)
    }
    
    async totalValueWallet(type, userId){
        var total: number=0;
        const wallet = await walletRepository.find({
            where:{
                type_Coin:type,
                user: {id:userId}
            }
        })
        if (wallet.length > 0) {
            total = wallet.reduce((acc, coin) => acc + Number(coin.quantity), 0);
        }   
        return total    
    }


}