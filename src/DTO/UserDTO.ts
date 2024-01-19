import { User } from "../model/entity/User";
import { Wallet } from "../model/entity/Wallet";

export class UserDTO {
   
    constructor(    
        public id:number,
        public firtName: string,
        public age: number,
){}

    static fromModel(user:User):UserDTO {
        const userDTO = new UserDTO(
           user.id,
           user.firstName,
           user.age,
           
        )
        return userDTO;
    } 

    tomodel(): User{
        let newUser = new User();
        newUser.id = this.id,
        newUser.firstName = this.firtName,
        newUser.age = this.age
        return newUser;
    }
}