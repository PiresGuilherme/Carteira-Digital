import { BaseHttpException } from "./BaseHttpException";

export class ImpossibleConversion extends BaseHttpException {
    constructor(message){
        super(400, "BAD REQUEST", message)
    }
}