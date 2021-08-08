import { ICommand } from "@nestjs/cqrs";



export class TaskCreateCommand implements ICommand {

    constructor(
        public title: string,
        public description: string | null,
        public is_finish: boolean | null
    ) { }

}