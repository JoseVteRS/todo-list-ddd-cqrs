import { TaskMarkAsFinishUseCase } from './../use-cases/write/task-mark-finish.usecase';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TaskMarkFinishCommand } from './task-mark-finish.command';
import { VOUuid } from '@shared-kernel/common/domain/value-objects/uuid.vo';



@CommandHandler(TaskMarkFinishCommand)
export class TaskMarkFinishCommandHandler implements ICommandHandler<TaskMarkFinishCommand> {
    constructor(private readonly taskMarkFinish: TaskMarkAsFinishUseCase) { }

    execute(command: TaskMarkFinishCommand) {
        return this.taskMarkFinish.execute(
            command.taskId
        )
    }
}