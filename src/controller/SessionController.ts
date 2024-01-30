import { UserService } from "../model/service/UserSevice";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

const secretKey = "PiresPiresPires"

export class SessionController {
    async login(email: string, password: string) {
        try {
            const userService = new UserService();
            const user = await userService.getUser(email);
            console.log(user);
            
            if (!user) {
                return Error("Usuário ou senha inválidos.");
            }
            const validPass = await bcrypt.compare(password, user.password);
            console.log(validPass);

            if (!validPass) {
                return Error("Usuário ou senha inválidos.");
            }
            
            return jwt.sign({
                userId: user.id
            }, secretKey)
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async verifyToken(token: string) {
        if (!token) {
            throw new Error("Usuário não autenticado.")
        }
        try {
            const jwtPayload = jwt.verify(token, secretKey);

        } catch (error) {
            throw new Error("Token invalido.")

        }
    }

}
