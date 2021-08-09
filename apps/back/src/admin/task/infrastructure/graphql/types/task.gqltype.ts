import { Field, ID, ObjectType } from "@nestjs/graphql";




@ObjectType()
export class Task {
    @Field(() => ID)
    _id: string;
    @Field(() => String)
    title: string;
    @Field(() => String)
    description: string;
    @Field(() => Boolean)
    is_finish: boolean;
}