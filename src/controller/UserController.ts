import { UserService } from "../model/service/UserSevice";

const userService = new UserService;
export class UserController{
    getUsers(){
        try {
            const response = userService.getUsers();
            
        } catch (error) {
            
        }
    }
}