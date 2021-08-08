import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { text as figletText } from 'figlet';
import { CommonEnv } from '@shared-kernel/common/infrastructure/enums/common-env.enum';

import { AppModule } from './config/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get(ConfigService);

  const port: number = configService.get<string>(CommonEnv.SELF_DOMAIN)
    ? Number(configService.get<string>(CommonEnv.PORT))
    : 3000;

  const self_domain: string = configService.get<string>(CommonEnv.SELF_DOMAIN)
    ? (configService.get<string>(CommonEnv.SELF_DOMAIN) as string)
    : 'http://localhost';


  app.enableCors();

  await app.listen(port);

  figletText('TODO\n=> back', function (err, data) {
    if (err) return;
    Logger.debug('\n' + data);
  });

  Logger.log(`Application is running on ${self_domain}:${port}`, 'Main');
}

bootstrap();
