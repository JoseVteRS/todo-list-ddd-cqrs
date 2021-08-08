import { BadRequestException } from "@nestjs/common";




export class TaskCantMarkAsNotFinishable extends BadRequestException {
    constructor() {
        super('Task can\'t mark as not finish because the task is marked as not finish already');
    }
}