import { Field, InputType } from "@nestjs/graphql";




@InputType()
export class TaskCreateInput {
    @Field(() => String, { nullable: false })
    title: string;

    @Field(() => String, { nullable: true })
    description?: string;
}