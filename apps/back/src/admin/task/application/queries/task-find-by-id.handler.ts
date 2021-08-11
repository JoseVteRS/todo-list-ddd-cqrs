import { IQueryHandler } from '@nestjs/cqrs';
import { QueryHandler } from '@nestjs/cqrs';
import { taskMapper } from '../../domain/mappers/task-find-by-id.mapper';
import { TaskFindByIdUseCase } from '../use-cases/read/task-find-by-id.usecase';
import { TaskFindByIdQuery } from './task-find-by-id.query';



@QueryHandler(TaskFindByIdQuery)
export class TaskFindByIdQueryHandler implements IQueryHandler<TaskFindByIdQuery> {
    constructor(private readonly taskFindByIdUseCase: TaskFindByIdUseCase) { }

    async execute(query: TaskFindByIdQuery) {
        const taskById = await this.taskFindByIdUseCase.execute(
            query.taskId
        );
        return taskMapper(taskById)

    }
}