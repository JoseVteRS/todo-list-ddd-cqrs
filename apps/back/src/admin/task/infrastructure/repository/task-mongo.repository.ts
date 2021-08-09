import { VOPositiveInt } from './../../../../../../../libs/shared-kernel/src/common/domain/value-objects/positive-int.vo';
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { ITaskRepository } from '../../domain/repository/task-repository.interface';
import { Schemas } from '../../../../config/mongodb/enums/schemas.enum';
import { Model } from "mongoose";
import { ITaskDoc, ITask } from '../../../../config/mongodb/interfaces/todo-doc.interface';
import { TaskModel } from '../../domain/model/task.model';
import { VOUuid } from '../../../../../../../libs/shared-kernel/src/common/domain/value-objects/uuid.vo';
import { TaskNotFoundException } from "../../domain/exceptions/task-not-found.exception";
import { VOTitle } from '../../domain/value-objects/title.vo';
import { VODescription } from '../../domain/value-objects/description.vo';
import { TaskUpdateDto } from '../../domain/dtos/task-update.dto';






@Injectable()
export class TaskMongoRepository implements ITaskRepository {
    constructor(
        @InjectModel(Schemas.TASKS)
        private readonly taskMongoModel: Model<ITaskDoc>
    ) { }

    toDomain(persistentEntity: ITaskDoc): TaskModel {
        const { _id, title, description, is_finish } = persistentEntity;

        return TaskModel.build(_id, title, description, is_finish);
    }

    toPersistence(domainEntity: TaskModel): ITask {
        const { _id, title, description, is_finish } = domainEntity;
        return {
            _id: _id.value,
            title: title.value,
            description: description.value,
            is_finish: false
        }
    }

    /**
     * Create a new Task
     * @param task TaskModel
     * @returns True if success
     */
    async create(task: TaskModel): Promise<boolean> {
        const persitentTask = this.toPersistence(task);

        await this.taskMongoModel.create(persitentTask);
        return true;
    }

    /**
     * Find a Task by ID
     * @param taskId Task's ID
     * @returns TaskModel
     */
    async findById(taskId: VOUuid): Promise<TaskModel> {
        const existingTask = await this.taskMongoModel
            .findById(taskId)
            .exec();

        if (!existingTask) throw new TaskNotFoundException();

        return this.toDomain(existingTask);
    }

    async findAll(): Promise<TaskModel[]> {
        const persistentTasks = await this.taskMongoModel
            .find()
            .exec();
        console.log({ persistentTasks })
        return persistentTasks.map((task) => this.toDomain(task));
    }

    /**
     * Updata a Name and Description of the a Task
     * @param task TaskModel
     * @returns True if success
     */
    async update(task: TaskModel): Promise<boolean> {
        const persistentTask = this.toPersistence(task);
        const { _id, ...rest } = persistentTask;

        console.log('update mongo repository', { persistentTask })
        console.log('update mongo repository', { task })

        await this.taskMongoModel
            .findByIdAndUpdate(_id, rest)
            .exec();
        return true;
    }

    /**
     * Mark as a finish a Task
     * @param taskId Task's ID
     */
    async markFinishTask(taskId: VOUuid): Promise<void> {
        await this.findById(taskId);

        await this.taskMongoModel
            .findByIdAndUpdate(taskId, { is_finish: true })
            .exec()
    }

    /**
     * Mark as not finished a Task
     * @param taskId Task's ID
     */
    async markNotFinishTask(taskId: VOUuid): Promise<void> {
        await this.findById(taskId);

        await this.taskMongoModel
            .findByIdAndUpdate(taskId, { is_finish: false })
            .exec();
    }


    /**
     * Delete a Task
     * @param taskId Task's ID
     * @returns True if success
     */
    async delete(taskId: VOUuid): Promise<boolean> {
        await this.findById(taskId);

        await this.taskMongoModel
            .findByIdAndDelete(taskId)
            .exec();

        return true;
    }
}