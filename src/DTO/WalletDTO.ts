import { User } from "../model/entity/User";
import { Wallet, typeCoin } from "../model/entity/Wallet";

export class WalletDTO {
    constructor(
        public id:number,
        public type_coin : typeCoin,
        public quantity:number,
        public user:User
    ){}
    static fromModel(wallet:Wallet): WalletDTO{
        const walletDTO = new WalletDTO(
            wallet.id,
            wallet.type_Coin,
            wallet.quantity,
            wallet.user
        );
        return walletDTO
    }
    toModel(){
        const newWallet = new Wallet()
        newWallet.id = this.id,
        newWallet.type_Coin = this.type_coin,
        newWallet.quantity = this.quantity,
        newWallet.user = this.user
        return newWallet
    }
}