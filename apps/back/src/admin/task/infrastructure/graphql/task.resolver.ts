import { TaskListQuery } from './../../application/queries/task-list.query';
import { VOPositiveInt } from './../../../../../../../libs/shared-kernel/src/common/domain/value-objects/positive-int.vo';
import { TaskMarkNotFinishCommand } from './../../application/commands/task-mark-not-finish.command';
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { Args, ID, Int, Mutation, Query, Resolver } from "@nestjs/graphql";
import { TaskCreateInput } from "./inputs/task-create.input";
import { TaskCreateCommand } from '../../application/commands/task-create.command';
import { VOUuid } from '../../../../../../../libs/shared-kernel/src/common/domain/value-objects/uuid.vo';
import { TaskDeleteCommand } from '../../application/commands/task-delete.command';
import { TaskMarkFinishCommand } from '../../application/commands/task-mark-finish.command';
import { TaskUpdateInput } from './inputs/task-update.input';
import { TaskUpdateCommand } from '../../application/commands/task-update.command';
import { Task } from './types/task.gqltype';
import { TaskModel } from '../../domain/model/task.model';





@Resolver()
export class TaskResolver {

    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus,
    ) { }

    @Query(() => String)
    gql_test(): string {
        return 'Grapqh running'
    }

    /**
     * Find and list Tasks
     * @returns TaskModel array or null
     */
    @Query(() => [Task])
    async task_list(): Promise<TaskModel[] | null> {
        return await this.queryBus.execute(new TaskListQuery());
    }


    @Mutation(() => Boolean)
    async task_create(
        @Args('input', { type: () => TaskCreateInput })
        input: TaskCreateInput
    ): Promise<boolean> {

        await this.commandBus.execute(
            new TaskCreateCommand(
                input.title, input.description, false
            )
        );
        return true
    }



    @Mutation(() => Boolean)
    async task_delete(
        @Args('taskId', { type: () => ID })
        taskId: VOUuid
    ): Promise<boolean> {
        await this.commandBus.execute(
            new TaskDeleteCommand(taskId)
        );
        return true;
    }


    @Mutation(() => Boolean)
    async task_mark_as_finished(
        @Args('taskId', { type: () => ID })
        taskId: VOUuid
    ): Promise<boolean> {
        await this.commandBus.execute(
            new TaskMarkFinishCommand(taskId)
        );
        return true;
    }

    @Mutation(() => Boolean)
    async task_mark_as_not_finished(
        @Args('taskId', { type: () => ID })
        taskId: VOUuid
    ): Promise<boolean> {
        await this.commandBus.execute(
            new TaskMarkNotFinishCommand(taskId)
        );
        return true;
    }

    @Mutation(() => Boolean)
    async task_update(
        @Args('taskId', { type: () => ID })
        taskId: VOUuid,
        @Args('input', { type: () => TaskUpdateInput })
        input: Partial<TaskUpdateInput>
    ): Promise<boolean> {
        await this.commandBus.execute(
            new TaskUpdateCommand(taskId, input.title, input.description)
        );
        return true;
    }

}