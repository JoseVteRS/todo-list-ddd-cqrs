import { VODescription } from './../../../domain/value-objects/description.vo';
import { VOTitle } from './../../../domain/value-objects/title.vo';
import { VOUuid } from '@shared-kernel/common/domain/value-objects/uuid.vo';
import { InjectTaskRepository } from "@back/admin/task/domain/repository/task-repository.ditoken";
import { ITaskRepository } from "@back/admin/task/domain/repository/task-repository.interface";
import { IUseCase } from "@shared-kernel/common/application/interfaces/use-case.interface";



export class TaskUpdateUseCase implements IUseCase {
    constructor(
        @InjectTaskRepository()
        private readonly taskRepository: ITaskRepository
    ) { }


    async execute(
        taskId: VOUuid,
        title: VOTitle,
        description: VODescription
    ) {
        const taskById = await this.taskRepository.findById(taskId);
        if (!taskById) throw new Error('Task no found');


        taskById.update(title, description);

        await this.taskRepository.update(taskById)

    }

}