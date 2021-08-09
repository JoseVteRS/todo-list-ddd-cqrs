import { Provider } from "@nestjs/common";
import { TaskCreateCommandHandler } from "../../application/commands/task-create.handler";
import { TaskDeleteCommandHandler } from "../../application/commands/task-delete.handler";
import { TaskCreateUseCase } from "../../application/use-cases/write/task-create.usecase";
import { TaskDeleteUseCase } from "../../application/use-cases/write/task-delete.usecase";
import { DITokenTaskRepository } from "../../domain/repository/task-repository.ditoken";
import { TaskResolver } from "../graphql/task.resolver";
import { TaskMongoRepository } from "../repository/task-mongo.repository";
import { TaskMarkAsFinishUseCase } from '../../application/use-cases/write/task-mark-finish.usecase';
import { TaskMarkFinishCommandHandler } from '../../application/commands/task-mark-finish.handler';
import { TaskMarkNotFinishCommandHandler } from '../../application/commands/task-mark-not-finish.handler';
import { TaskMarkNotFinishUseCase } from '../../application/use-cases/write/task-mark-not-finish.usecase';
import { TaskUpdateCommandHandler } from '../../application/commands/task-update.handler';
import { TaskUpdateUseCase } from '../../application/use-cases/write/task-update.usecase';
import { TaskListQueryHandler } from "../../application/queries/task-list.handler";
import { TaskListUseCase } from "../../application/use-cases/read/task-list.usecase";




const Repositories: Provider[] = [
    { provide: DITokenTaskRepository, useClass: TaskMongoRepository }
];

const QueryHandlers: Provider[] = [
    TaskListQueryHandler,
];

const CommandHandlers: Provider[] = [
    TaskCreateCommandHandler,
    TaskDeleteCommandHandler,
    TaskMarkFinishCommandHandler,
    TaskMarkNotFinishCommandHandler,
    TaskUpdateCommandHandler,
];

const EventHandlers: Provider[] = [

];


const UseCases: Provider[] = [
    TaskCreateUseCase,
    TaskDeleteUseCase,
    TaskMarkAsFinishUseCase,
    TaskMarkNotFinishUseCase,
    TaskUpdateUseCase,
    TaskListUseCase,
];

const ApplicationServices: Provider[] = [];


const Resolvers: Provider[] = [
    TaskResolver
];






export const BD_ADMIN_Task_Providers = [
    ...Repositories,
    ...QueryHandlers,
    ...CommandHandlers,
    ...EventHandlers,
    ...UseCases,
    ...ApplicationServices,
    ...Resolvers,
];