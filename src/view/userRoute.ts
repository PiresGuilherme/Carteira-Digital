import { Request, Response, Router } from "express";
import { UserController } from "../controller/UserController";
import { UserDTO } from "../DTO/UserDTO";

const router = Router();

router.get("/users" ,async (req:Request, res: Response)=> {
    const userController = new UserController();    
    const users = await userController.getUsers();
    console.log(users);    
});

router.post("/users", (req:Request,res:Response)=> {
    const userController = new UserController();
    userController.newUser(new UserDTO(
        null,
        req.body.name,
        req.body.age
    ))
})

export {router}


