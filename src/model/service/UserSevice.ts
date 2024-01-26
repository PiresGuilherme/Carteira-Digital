import { AppDataSource } from "../data-source";
import { User } from "../entity/User";

const userRepository = AppDataSource.getRepository(User);
export class UserService {
    getUsers() {
        return userRepository.find();
    }
    getUser(email) {
        return userRepository.findOneBy({
            email:email
        });
    }

    newUser(user) {
        const userExists = userRepository.existsBy({ email: user.email })
        if (!userExists) {
            return  Error("Email já cadastrado.")
        }
        return userRepository.save(user);
    }
}
