import { Request, Response, Router } from "express";
import  asyncHandler  from  'express-async-handler'
import { UserController } from "../controller/UserController";
import { UserDTO } from "../DTO/UserDTO";
import { SessionController } from "../controller/SessionController";
import "express-async-errors"

const router = Router();

router.get("/users", async (req: Request, res: Response) => {
    const userController = new UserController();
    const users = await userController.getUsers();
    console.log(users);
});

router.post("/users", async (req: Request, res: Response) => {
    const userController = new UserController();
    await userController.newUser(new UserDTO(
        null,
        req.body.name,
        req.body.age,
        req.body.email,
        req.body.password
    ))
})
router.post("/login",  async (req: Request, res: Response) => {
    const sessionController = new SessionController();
        const token = await sessionController.login(req.body.email, req.body.password);
        return res.status(200).json({token})
})
export { router }


