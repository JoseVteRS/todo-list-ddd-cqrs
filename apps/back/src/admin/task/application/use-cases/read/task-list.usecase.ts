import { VOBoolean } from './../../../../../../../../libs/shared-kernel/src/common/domain/value-objects/boolean.vo';
import { VODescription } from './../../../domain/value-objects/description.vo';
import { VOTitle } from './../../../domain/value-objects/title.vo';
import { VOUuid } from './../../../../../../../../libs/shared-kernel/src/common/domain/value-objects/uuid.vo';
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
        return await this.taskRepository.findAll();
    }
}