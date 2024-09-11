import { NestFactory } from '@nestjs/core';
import { AppModule } from '@src/alpha/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');

  await app.listen(8888);

}
bootstrap();
