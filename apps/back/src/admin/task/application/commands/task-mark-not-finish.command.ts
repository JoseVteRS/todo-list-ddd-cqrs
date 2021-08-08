import { ICommand } from '@nestjs/cqrs';
import { VOUuid } from '../../../../../../../libs/shared-kernel/src/common/domain/value-objects/uuid.vo';



export class TaskMarkNotFinishCommand implements ICommand {
    constructor(
        public readonly taskId: VOUuid
    ) { }
}