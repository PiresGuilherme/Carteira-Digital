import { User } from "../model/entity/User";
import { Wallet, type_transaction } from "../model/entity/Wallet";

export class WalletDTO {
    constructor(
        public id:number,
        public type_coin : string,
        public quantity:number,
        public type_transaction: type_transaction,
        public user:User
    ){}
    static fromModel(wallet:Wallet): WalletDTO{
        const walletDTO = new WalletDTO(
            wallet.id,
            wallet.type_Coin,
            wallet.quantity,
            wallet.type_transaction,
            wallet.user
        );
        return walletDTO
    }
    toModel(){
        const newWallet = new Wallet()
        newWallet.id = this.id,
        newWallet.type_Coin = this.type_coin,
        newWallet.quantity = this.quantity,
        newWallet.type_transaction = this.type_transaction,
        newWallet.user = this.user
        return newWallet
    }
}