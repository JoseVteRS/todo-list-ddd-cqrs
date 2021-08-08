import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { VOBoolean } from "@shared-kernel/common/domain/value-objects/boolean.vo";
import { VOUuid } from "@shared-kernel/common/domain/value-objects/uuid.vo";
import { VODescription } from "../../domain/value-objects/description.vo";
import { VOTitle } from "../../domain/value-objects/title.vo";
import { TaskCreateUseCase } from "../use-cases/write/task-create.usecase";
import { TaskCreateCommand } from "./task-create.command";





@CommandHandler(TaskCreateCommand)
export class TaskCreateCommandHandler implements ICommandHandler<TaskCreateCommand> {

    constructor(
        private readonly taskCreateUseCase: TaskCreateUseCase
    ) { }

    async execute(command: TaskCreateCommand) {
        return this.taskCreateUseCase.execute(
            VOUuid.create(),
            new VOTitle(command.title),
            command.description ? new VODescription(command.description) : null,
            command.is_finish ? new VOBoolean(command.is_finish) : null,
        );
    }
}