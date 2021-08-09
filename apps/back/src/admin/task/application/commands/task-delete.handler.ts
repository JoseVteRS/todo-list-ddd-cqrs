import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { VOUuid } from '@shared-kernel/common/domain/value-objects/uuid.vo';
import { TaskDeleteUseCase } from '../use-cases/write/task-delete.usecase';
import { TaskDeleteCommand } from './task-delete.command';





@CommandHandler(TaskDeleteCommand)
export class TaskDeleteCommandHandler implements ICommandHandler<TaskDeleteCommand> {

    constructor(
        private readonly taskDeleteUseCase: TaskDeleteUseCase
    ) { }

    async execute(command: TaskDeleteCommand) {

        return await this.taskDeleteUseCase.execute(
            command.taskId
        );
    }
}