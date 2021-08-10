import { Field, ID, ObjectType } from "@nestjs/graphql";




@ObjectType()
export class Task {
    @Field(() => ID)
    _id?: string;
    @Field(() => String, { nullable: true })
    title?: string;
    @Field(() => String, { nullable: true })
    description?: string;
    @Field(() => Boolean, { nullable: true })
    is_finish?: boolean;
}