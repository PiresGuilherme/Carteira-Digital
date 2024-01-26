import { UserService } from "../model/service/UserSevice";
import { UserDTO } from "../DTO/UserDTO";
import { User } from "../model/entity/User";

const userService = new UserService;
export class UserController {
    async getUsers() {
        try {
            const response = await userService.getUsers();
            return response.map((user: User) => UserDTO.fromModel(user))
        } catch (error) {
            return error
        }
    }

    async newUser(userDTO: UserDTO) {
        try {
            const newUser = userDTO.tomodel();
            const response = await userService.newUser(newUser);
            console.log(response);
            return UserDTO.fromModel(response);
        } catch (error) {
            throw new Error(error.message)
        }
    }
} 