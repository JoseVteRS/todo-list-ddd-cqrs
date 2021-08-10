import { VOBoolean } from './../../../../../../../libs/shared-kernel/src/common/domain/value-objects/boolean.vo';
import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { VOUuid } from "@shared-kernel/common/domain/value-objects/uuid.vo";
import { VODescription } from "../../domain/value-objects/description.vo";
import { VOTitle } from "../../domain/value-objects/title.vo";
import { TaskListUseCase } from "../use-cases/read/task-list.usecase";
import { TaskListQuery } from "./task-list.query";
import { taskListMapper } from '../../domain/mappers/task-list.mapper';






@QueryHandler(TaskListQuery)
export class TaskListQueryHandler
    implements IQueryHandler<TaskListQuery> {
    constructor(private readonly taskListUseCase: TaskListUseCase) { }

    async execute() {
        const taskList = await this.taskListUseCase.execute()
        return taskListMapper(taskList)
    }
}


