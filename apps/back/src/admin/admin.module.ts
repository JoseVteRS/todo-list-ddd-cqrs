import { Module } from "@nestjs/common";
import { CqrsModule } from "@nestjs/cqrs";
import { MongoDBModule } from '../config/mongodb/mongodb.module';
import { GqlModule } from '../config/graphql/graphql.module';
import { BD_ADMIN_Task_Providers } from "./task/infrastructure/providers/task.providers";




@Module({
    imports: [CqrsModule, MongoDBModule, GqlModule],
    providers: [
        ...BD_ADMIN_Task_Providers
    ]
})
export class AdminModule { }