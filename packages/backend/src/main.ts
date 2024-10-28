import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as path from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

const PORT = Number.isNaN(Number(process.env.PORT)) ? 9000 : Number(process.env.PORT);
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useStaticAssets(path.join(__dirname, '../..', 'assets'), {
    index: false,
    prefix: '/uploads',
  });

  await app.listen(PORT, () => {
    console.log(`Server started by ${PORT} port`);
  });
}
bootstrap().then();
