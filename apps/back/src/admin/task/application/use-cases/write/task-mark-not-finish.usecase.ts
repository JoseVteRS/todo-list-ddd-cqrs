import { TaskNotFoundException } from "@back/admin/task/domain/exceptions/task-not-found.exception";
import { InjectTaskRepository } from "@back/admin/task/domain/repository/task-repository.ditoken";
import { ITaskRepository } from "@back/admin/task/domain/repository/task-repository.interface";
import { Injectable } from "@nestjs/common";
import { IUseCase } from "@shared-kernel/common/application/interfaces/use-case.interface";
import { VOUuid } from '../../../../../../../../libs/shared-kernel/src/common/domain/value-objects/uuid.vo';




@Injectable()
export class TaskMarkNotFinishUseCase implements IUseCase {
    constructor(
        @InjectTaskRepository()
        private readonly taskRepository: ITaskRepository
    ) {}

    async execute(taskId: VOUuid) {
        const taskById = await this.taskRepository.findById(taskId);

        if (!taskById) throw new TaskNotFoundException();
        taskById.markTaskNotFinished();

        await this.taskRepository.markNotFinishTask(taskId);

    }
}