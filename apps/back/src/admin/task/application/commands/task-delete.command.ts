import { ICommand } from '@nestjs/cqrs';



export class TaskDeleteCommand implements ICommand {
    constructor(
        public readonly taskId: string
    ) { }
}