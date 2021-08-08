import { Injectable } from "@nestjs/common";
import { InjectTaskRepository } from "../../../domain/repository/task-repository.ditoken";
import { ITaskRepository } from "../../../domain/repository/task-repository.interface";
import { IUseCase } from '@shared-kernel/common/application/interfaces/use-case.interface';
import { VOUuid } from '@shared-kernel/common/domain/value-objects/uuid.vo';
import { TaskNotFoundException } from "@back/admin/task/domain/exceptions/task-not-found.exception";





@Injectable()
export class TaskDeleteUseCase implements IUseCase {
    constructor(
        @InjectTaskRepository()
        private readonly taskRepository: ITaskRepository
    ) { }

    async execute(
        taskId: VOUuid
    ) {
        const taskById = await this.taskRepository.findById(taskId);
         if (!taskById) throw new TaskNotFoundException();
         taskById.delete(taskId)
        await this.taskRepository.delete(taskId);
    }
}