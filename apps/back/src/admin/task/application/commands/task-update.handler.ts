import { VOTitle } from './../../domain/value-objects/title.vo';
import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { VOUuid } from "@shared-kernel/common/domain/value-objects/uuid.vo";
import { TaskUpdateUseCase } from "../use-cases/write/task-update.usecase";
import { TaskUpdateCommand } from "./task-update.command";
import { VODescription } from '../../domain/value-objects/description.vo';





@CommandHandler(TaskUpdateCommand)
export class TaskUpdateCommandHandler
    implements ICommandHandler<TaskUpdateCommand> {
    constructor(private readonly taskUpdateUseCase: TaskUpdateUseCase) { }

    execute(command: TaskUpdateCommand) {
        return this.taskUpdateUseCase.execute(
            command.taskId,
            command.title ? new VOTitle(command.title) : null,
            command.description ? new VODescription(command.description) : null,
        )
    }


}