import { BadGatewayException } from "@nestjs/common";




export class TaskNothingToUpdateException extends BadGatewayException {
    constructor() {
        super('TASK_NOTHING_TO_UPDATE')
    }
}