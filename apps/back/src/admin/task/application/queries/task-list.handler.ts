import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { VOPositiveInt } from "@shared-kernel/common/domain/value-objects/positive-int.vo";
import { TaskListUseCase } from "../use-cases/read/task-list.usecase";
import { TaskListQuery } from "./task-list.query";






@QueryHandler(TaskListQuery)
export class TaskListQueryHandler
    implements IQueryHandler<TaskListQuery> {
    constructor(private readonly taskListUseCase: TaskListUseCase) { }

    execute(query: TaskListQuery) {
        console.log({ query })
        return this.taskListUseCase.execute()
    }

}