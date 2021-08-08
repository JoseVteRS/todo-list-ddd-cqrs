import { Field, InputType, ID } from '@nestjs/graphql';




@InputType()
export class TaskMarkFinishInput {
    @Field(() => ID)
    _id: string;
}