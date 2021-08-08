import { BadRequestException } from "@nestjs/common";



export class TaskDescriptionLongestException extends BadRequestException {
    constructor(value: string) {
        super('',`La descripción no puede superar los 150 carácteres. Actualmente ${value ? value.length : ''}`
        )
    }
}