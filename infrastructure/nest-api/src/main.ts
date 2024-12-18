// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config({ path: './../../.env' });
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 8000;
  app.enableCors();
  await app.listen(port);
}
bootstrap();
