import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { DriverAPIModule } from './app/driver-api.module';
import { initializeApp } from 'firebase-admin/app';
import { credential } from 'firebase-admin';

import './instrument';
import { getConfig } from 'license-verify';

async function bootstrap() {
  const app = await NestFactory.create(DriverAPIModule.register());

  const port = parseInt(process.env.DRIVER_API_PORT || '3000', 10);
  app.enableShutdownHooks();
  app.enableCors();
  const config = await getConfig(process.env.NODE_ENV ?? 'production');
  if (config != null) {
    initializeApp({
      credential: credential.cert(
        `${process.cwd()}/config/${config.firebaseProjectPrivateKey}`,
      ),
    });
  }
  await app.listen(port, () => {
    Logger.log('Listening at http://localhost:' + port, 'Driver API');
  });
}

bootstrap();
