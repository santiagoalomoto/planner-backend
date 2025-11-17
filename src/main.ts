import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { AllExceptionsFilter } from './common/filters/all-exceptions.filter';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 🔹 Habilitar CORS
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:5174'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // 🔹 Pipes globales (validación)
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: false })
  );

  // 🔹 Prefijo global
  app.setGlobalPrefix('api');

  // -------------------------------------------------------
  // 🔥 AGREGADO: INTERCEPTOR DE LOGS
  app.useGlobalInterceptors(new LoggingInterceptor());

  // 🔥 AGREGADO: FILTRO DE ERRORES GLOBAL (sin HttpAdapterHost)
  app.useGlobalFilters(new AllExceptionsFilter());
  // -------------------------------------------------------

  await app.listen(process.env.PORT || 3000);
  console.log(
    `✅ Server running on http://localhost:${process.env.PORT || 3000}/api`
  );
}
bootstrap();
