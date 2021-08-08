import { Field, InputType } from "@nestjs/graphql";




@InputType()
export class TaskUpdateInput {
    @Field(() => String, { nullable: true })
    title?: string;

    @Field(() => String, { nullable: true })
    description?: string;
}