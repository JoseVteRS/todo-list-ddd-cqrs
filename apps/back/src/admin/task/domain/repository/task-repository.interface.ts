import { VOPositiveInt } from './../../../../../../../libs/shared-kernel/src/common/domain/value-objects/positive-int.vo';
import { IRepository } from '@shared-kernel/common/domain/interfaces/repository.interface';
import { TaskModel } from "../model/task.model";
import { VOTitle } from '../value-objects/title.vo';
import { VODescription } from '../value-objects/description.vo';
import { VOUuid } from '@shared-kernel/common/domain/value-objects/uuid.vo';



export interface ITaskRepository extends IRepository<TaskModel> {

    /** Create a new User */
    create(task: TaskModel): Promise<boolean>;

    /** Update a task */
    update(task: TaskModel): Promise<boolean>;

    /** Mark a task as finish */
    markFinishTask(taskId: VOUuid): Promise<void>;

    /** Mark a task as Not finish */
    markNotFinishTask(taskId: VOUuid): Promise<void>;

    /** Find all task and listed */
    findAll(): Promise<TaskModel[]>;

    /** Find an user by user's id */
    findById(taskId: VOUuid): Promise<TaskModel>

    /** Delete an user by user's id */
    delete(taskId: VOUuid): Promise<boolean>;

}

