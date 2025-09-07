import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // validacion global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // habilitar cors
  app.enableCors({
    origin: 'http://localhost:4200',
    credentials: true,
  });

  // agregar prefijo
  app.setGlobalPrefix('api/v1');

  // inicio del servidor
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
