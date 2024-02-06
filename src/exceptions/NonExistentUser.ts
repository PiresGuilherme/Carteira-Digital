import { BaseHttpException } from "./BaseHttpException";    

export class NonExistentUser extends BaseHttpException {
    constructor(){
        super(404, "NOT FOUND", "Usuário não encontrado!")
    }
}