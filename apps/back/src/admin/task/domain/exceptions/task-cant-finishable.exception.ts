import { BadRequestException } from "@nestjs/common";



export class TaskCanNotFinishableException extends BadRequestException {
    constructor() {
        super('Task can\'t mark as finish because is finish already')
    }
}