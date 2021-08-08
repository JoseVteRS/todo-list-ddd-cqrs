import { VOUuid } from '@shared-kernel/common/domain/value-objects/uuid.vo';
import { ICommand } from '@nestjs/cqrs';



export class TaskUpdateCommand implements ICommand {
    constructor(
        public readonly taskId: VOUuid,
        public title: string,
        public description: string,
    ) { }
}