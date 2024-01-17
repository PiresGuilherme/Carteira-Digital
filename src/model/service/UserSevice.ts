import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

const userRepository = AppDataSource.getRepository(User);
export class UserService {
    getUsers(){
        return userRepository.find()
    }
}
