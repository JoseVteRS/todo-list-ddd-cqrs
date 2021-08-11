import { VOUuid } from './../../../../../../../libs/shared-kernel/src/common/domain/value-objects/uuid.vo';
import { IQuery } from '@nestjs/cqrs';



export class TaskFindByIdQuery implements IQuery {
    constructor(
        public readonly taskId: VOUuid
    ) { }
}