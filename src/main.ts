import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import {
  createProxyMiddleware,
} from 'http-proxy-middleware';

async function bootstrap() {

  const app =
    await NestFactory.create(AppModule);

  // CONFIG SWAGGER
  const config =
    new DocumentBuilder()

      .setTitle(
        'Gateway API',
      )

      .setDescription(
        'API Gateway de alquiler de vehiculos',
      )

      .setVersion('1.0')

      .build();

  const document =
    SwaggerModule.createDocument(
      app,
      config,
    );

  SwaggerModule.setup(
    'docs',
    app,
    document,
  );

  // VEHICULOS
  app.use(
    '/vehicles',

    createProxyMiddleware({
      target:
        'http://alquiler-vehiculos:3001',

      changeOrigin: true,
    }),
  );

  // OPERACIONES
  app.use(
    '/operations',

    createProxyMiddleware({
      target:
        'http://alquiler-operaciones:3000',

      changeOrigin: true,
    }),
  );

  await app.listen(8080, '0.0.0.0');

  console.log(
    'Gateway running on port 8080',
  );
}

bootstrap();
