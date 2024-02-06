import { UserService } from "../model/service/UserSevice";
import bcrypt from "bcrypt"
import jwt, { JwtPayload } from "jsonwebtoken";
import { NonExistentUser } from "../exceptions/NonExistentUser";

const secretKey = "PiresPiresPires"
interface DecodedTokenPayLoad extends JwtPayload {
    userId: number;
  }
export class SessionController {

    
    async login(email: string, password: string) {
        try {
            const userService = new UserService();
            const user = await userService.getUser(email);
            console.log(user);
            
            if (!user) {
                throw new NonExistentUser();
            }
            const validPass = await bcrypt.compare(password, user.password);
            console.log(validPass);

            if (!validPass) {
                return Error("Usuário ou senha inválidos.");
            }
            
            return jwt.sign({
                userId: user.id
            },
             secretKey)

        } catch (error) {
            throw new Error(error.message);
        }
    }

    verifyToken(token: string) {
        if (!token) {
            throw new Error("Usuário não autenticado.")
        }
        try {
            const jwtPayload = jwt.verify(token, secretKey)as DecodedTokenPayLoad;;
            return jwtPayload;
        } catch (error) {
            throw new Error("Token inválido.")

        }
    }

}
