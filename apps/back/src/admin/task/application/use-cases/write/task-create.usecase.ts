import { Injectable } from "@nestjs/common";
import { IUseCase } from '@shared-kernel/common/application/interfaces/use-case.interface';
import { InjectTaskRepository } from "../../../domain/repository/task-repository.ditoken";
import { ITaskRepository } from '../../../domain/repository/task-repository.interface';
import { VOTitle } from '../../../domain/value-objects/title.vo';
import { VODescription } from '../../../domain/value-objects/description.vo';
import { TaskModel } from '../../../domain/model/task.model';
import { VOUuid } from '@shared-kernel/common/domain/value-objects/uuid.vo';
import { VOBoolean } from '@shared-kernel/common/domain/value-objects/boolean.vo';




@Injectable()
export class TaskCreateUseCase implements IUseCase {
    constructor(
        @InjectTaskRepository()
        private readonly taskRepository: ITaskRepository,
    ) { }

    async execute(
        taskId: VOUuid,
        title: VOTitle,
        description: VODescription | null,
        is_finish: VOBoolean | null,
    ) {
        // const planById = await this.taskRepository.findById(taskId);
        // if(planById) throw new Error('TaskIdAlreadyExists');

        const task = TaskModel.create(taskId, title, description, is_finish);
        console.log({task})
        await this.taskRepository.create(task);

    }
}