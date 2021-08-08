import { TaskMarkNotFinishCommand } from './../../application/commands/task-mark-not-finish.command';
import { CommandBus } from "@nestjs/cqrs";
import { Args, ID, Mutation, Query, Resolver } from "@nestjs/graphql";
import { TaskCreateInput } from "./inputs/task-create.input";
import { TaskCreateCommand } from '../../application/commands/task-create.command';
import { VOUuid } from '../../../../../../../libs/shared-kernel/src/common/domain/value-objects/uuid.vo';
import { TaskDeleteCommand } from '../../application/commands/task-delete.command';
import { TaskMarkFinishCommand } from '../../application/commands/task-mark-finish.command';
import { TaskUpdateInput } from './inputs/task-update.input';
import { TaskUpdateCommand } from '../../application/commands/task-update.command';





@Resolver()
export class TaskResolver {

    constructor(
        private readonly commandBus: CommandBus
    ) { }

    @Query(() => String)
    gql_test(): string {
        return 'Grapqh running'
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
            new TaskDeleteCommand(taskId.value)
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

        console.log('Update Resolver: ', { taskId, input })

        await this.commandBus.execute(
            new TaskUpdateCommand(taskId, input.title, input.description)
        );
        return true;
    }

}