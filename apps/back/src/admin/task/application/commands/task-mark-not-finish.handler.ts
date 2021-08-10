import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { VOUuid } from "@shared-kernel/common/domain/value-objects/uuid.vo";
import { TaskMarkNotFinishUseCase } from "../use-cases/write/task-mark-not-finish.usecase";
import { TaskMarkNotFinishCommand } from "./task-mark-not-finish.command";



@CommandHandler(TaskMarkNotFinishCommand)
export class TaskMarkNotFinishCommandHandler implements ICommandHandler<TaskMarkNotFinishCommand> {
    constructor(private readonly taskMarkNotFinish: TaskMarkNotFinishUseCase) { }

    execute(command: TaskMarkNotFinishCommand) {
        return this.taskMarkNotFinish.execute(
           command.taskId
        );
    }
}