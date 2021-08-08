import { Module } from "@nestjs/common";
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommonEnv } from '@shared-kernel/common/infrastructure/enums/common-env.enum';
import { Schemas } from './enums/schemas.enum';
import { TodoSchema } from './schemas/todo.schema';




@Module({
    imports: [
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => {
                return {
                    uri: configService.get(CommonEnv.DATABASE_URI),
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useCreateIndex: true,
                    useFindAndModify: false,
                }
            },
            inject: [ConfigService],
        }),
        //TODO: Add Schemas
        MongooseModule.forFeature([
            { name: Schemas.TASKS, schema: TodoSchema },
        ])
    ],
    exports: [MongooseModule]
})
export class MongoDBModule { }