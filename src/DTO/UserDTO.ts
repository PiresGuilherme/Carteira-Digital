import { User } from "../model/entity/User";
import { Wallet } from "../model/entity/Wallet";

export class UserDTO {
   
    constructor(    
        public id:number,
        public name: string,
        public age: number,
        public email:string,
        public password: string
){}

    static fromModel(user:User):UserDTO {
        const userDTO = new UserDTO(
           user.id,
           user.name,
           user.age,
           user.email,
           user.password
        )
        return userDTO;
    } 

    tomodel(): User{
        let newUser = new User();
        newUser.id = this.id,
        newUser.name = this.name,
        newUser.age = this.age,
        newUser.email = this.email,
        newUser.password = this.password

        return newUser;
    }
}