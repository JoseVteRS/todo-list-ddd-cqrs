import { InjectTaskRepository } from "@back/admin/task/domain/repository/task-repository.ditoken";
import { Injectable } from "@nestjs/common";
import { ITaskRepository } from '../../../domain/repository/task-repository.interface';
import { TaskNotFoundException } from '../../../domain/exceptions/task-not-found.exception';
import { VOUuid } from '@shared-kernel/common/domain/value-objects/uuid.vo';
import { IUseCase } from '@shared-kernel/common/application/interfaces/use-case.interface';
import { TaskModel } from '../../../domain/model/task.model';






@Injectable()
export class TaskMarkAsFinishUseCase implements IUseCase {
    constructor(
        @InjectTaskRepository()
        private readonly taskRepository: ITaskRepository
    ) { }

    async execute(taskId: VOUuid) {
        const taskById = await this.taskRepository.findById(taskId);

        if (!taskById) throw new TaskNotFoundException();

        taskById.markTaskAsFinished();

        await this.taskRepository.markFinishTask(taskId);
    }
}