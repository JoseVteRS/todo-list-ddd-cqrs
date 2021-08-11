import { VOUuid } from './../../../../../../../../libs/shared-kernel/src/common/domain/value-objects/uuid.vo';
import { InjectTaskRepository } from '@back/admin/task/domain/repository/task-repository.ditoken';
import { ITaskRepository } from '@back/admin/task/domain/repository/task-repository.interface';
import { Injectable } from '@nestjs/common';
import { IUseCase } from './../../../../../../../../libs/shared-kernel/src/common/application/interfaces/use-case.interface';






@Injectable()
export class TaskFindByIdUseCase implements IUseCase {
    constructor(
        @InjectTaskRepository()
        private readonly taskRepository: ITaskRepository
    ) { }

    async execute(
        taskId: VOUuid
    ) {
        return await this.taskRepository.findById(taskId);
    }
}