import { Injectable } from '@nestjs/common';
import { InjectTaskRepository } from '@back/admin/task/domain/repository/task-repository.ditoken';
import { ITaskRepository } from '@back/admin/task/domain/repository/task-repository.interface';
import { VOPositiveInt } from '@shared-kernel/common/domain/value-objects/positive-int.vo';
import { IUseCase } from '@shared-kernel/common/application/interfaces/use-case.interface';




@Injectable()
export class TaskListUseCase implements IUseCase {
    constructor(
        @InjectTaskRepository()
        private readonly taskRepository: ITaskRepository
    ) { }

    async execute() {
        await this.taskRepository.findAll()
    }
}