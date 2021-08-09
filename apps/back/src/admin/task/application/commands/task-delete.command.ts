import { VOUuid } from '@shared-kernel/common/domain/value-objects/uuid.vo';
import { ICommand } from '@nestjs/cqrs';



export class TaskDeleteCommand implements ICommand {
    constructor(
        public readonly taskId: VOUuid
    ) { }
}