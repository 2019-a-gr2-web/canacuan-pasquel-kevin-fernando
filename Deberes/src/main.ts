import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {join} from "path";
const cookieParser = require('cookie-parser');
import {NestExpressApplication} from "@nestjs/platform-express";
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule) as NestExpressApplication;

  app.use(cookieParser('EXAMEN WEB'));
  app.setViewEngine('ejs');
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.use(express.static('publico'));

  await app.listen(3012);
}
bootstrap();
