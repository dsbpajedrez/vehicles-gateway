import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import {
  createProxyMiddleware,
} from 'http-proxy-middleware';

async function bootstrap() {

  const app =
    await NestFactory.create(AppModule);

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