import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔹 Habilitar CORS para permitir peticiones desde el frontend
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:5174'], // URL de tu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // 🔹 Pipes globales (validación)
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: false }));

  // 🔹 Prefijo global
  app.setGlobalPrefix('api');

  await app.listen(process.env.PORT || 3000);
  console.log(`✅ Server running on http://localhost:${process.env.PORT || 3000}/api`);
}
bootstrap();
