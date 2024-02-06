import { BaseHttpException } from "./BaseHttpException";

export class ImpossibleConversion extends BaseHttpException {
    constructor(){
        super(400, "BAD REQUEST", "Não é possível fazer a conversão!")
    }
}