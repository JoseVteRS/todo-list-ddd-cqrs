
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { join } from "path";
import { CommonEnv } from '@shared-kernel/common/infrastructure/enums/common-env.enum';




@Module({
    imports: [
        GraphQLModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) => {
                const isDev = configService.get(CommonEnv.NODE_ENV)
                return {
                    autoSchemaFile: join(__dirname, '../../schema.gql'),
                    playground: isDev,
                    sortSchema: true,
                    debug: isDev,
                    tracing: true
                }
            },
            inject: [ConfigService]
        })
    ]
})
export class GqlModule { }