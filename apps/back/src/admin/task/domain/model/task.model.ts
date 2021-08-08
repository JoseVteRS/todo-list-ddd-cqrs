import { AggregateRoot } from '@nestjs/cqrs';
import { VOUuid } from '../../../../../../../libs/shared-kernel/src/common/domain/value-objects/uuid.vo';
import { VOBoolean } from '../../../../../../../libs/shared-kernel/src/common/domain/value-objects/boolean.vo';
import { VOTitle } from '../value-objects/title.vo';
import { VODescription } from '../value-objects/description.vo';
import { TaskCanNotFinishableException } from '../exceptions/task-cant-finishable.exception';
import { TaskCantMarkAsNotFinishable } from '../exceptions/task-cant-not-finishable.exception';




/**
 * Aggregate root: Task
 */
export class TaskModel extends AggregateRoot {
    constructor(
        public _id: VOUuid,
        public title: VOTitle,
        public description: VODescription,
        public is_finish: VOBoolean
    ) {
        super()
    }

    static build(
        _id: string,
        title: string,
        description?: string,
        is_finish?: boolean,
    ) {
        const task = new TaskModel(
            new VOUuid(_id),
            new VOTitle(title),
            new VODescription(description),
            new VOBoolean(is_finish || false),
        );
        return task;
    }


    static create(
        taskId: VOUuid,
        title: VOTitle,
        description?: VODescription | null,
        is_finish?: VOBoolean | null,
    ) {
        const task = new TaskModel(
            taskId,
            title,
            description,
            is_finish
        );
        return task;
    }

    public update(
        title: VOTitle,
        description: VODescription
    ) {
        this._assertDataWillChange(title, description);

        this.title = title;
        this.description = description;

    }

    public delete(
        taskId: VOUuid
    ) {
        this.notFound(taskId);
        this._assertIsDeletable();

        const task = new TaskModel(taskId, this.title, this.description, this.is_finish);
        return task;
    }

    /** Mark task as finished */
    public markTaskAsFinished() {
        this._assertTaskFinishable();
        this.is_finish = new VOBoolean(true);
    }

    /** Mark task as not finished */
    public markTaskNotFinished() {
        this._assertTaskIsNotFinishable();
        this.is_finish = new VOBoolean(false);
    }

    private _assertIsDeletable() {
        if (!this.is_finish)
            throw new Error('Task can not removed if is not finished already');
    }

    private notFound(taskId: VOUuid) {
        if (!this._id.equals(taskId))
            throw new Error('El id de la tarea no coincide');
    }


    private _assertTaskFinishable() {
        if (this.is_finish.value) throw new TaskCanNotFinishableException();
    }

    private _assertTaskIsNotFinishable() {
        if (!this.is_finish.value) throw new TaskCantMarkAsNotFinishable();
    }

    private _assertDataWillChange(
        title: VOTitle,
        description: VODescription
    ) {
        const oldData = {
            title: this.title.value,
            description: this.description.value
        };

        const newData = {
            title: title.value,
            description: description.value
        };
        if (JSON.stringify(oldData) === JSON.stringify(newData))
            throw new Error('TaskNothingToUpdateException');
    }


}
