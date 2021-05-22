import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); //TODO: DSPECIFY THE HOST
  await app.listen(3000);
}
bootstrap();
