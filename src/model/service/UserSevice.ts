import { AppDataSource } from "../data-source";
import { User } from "../entity/User";


const userRepository = AppDataSource.getRepository(User);
export class UserService {
    getUsers() {
        return userRepository.find();
    }
    getUser(email) {
        console.log(email);
        
        return userRepository.findOneBy({
            email:email
        });
    }

    async newUser(user) {
        const userExists = userRepository.existsBy({ email: user.email })
        if (!userExists) {
            return  Error("Email já cadastrado.")
        }
        const bcrypt = require('bcrypt');
        user.password = await bcrypt.hash(user.password, 10)
        return userRepository.save(user);
    }
}
