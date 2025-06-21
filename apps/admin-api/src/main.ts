import './instrument';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AdminAPIModule } from './app/admin-api.module';

async function bootstrap() {
  const app = await NestFactory.create(AdminAPIModule.register());

  const port = parseInt(process.env.ADMIN_API_PORT || '3000', 10);
  app.enableShutdownHooks();
  app.enableCors();
  await app.listen(port, () => {
    Logger.log(`Listening at http://localhost:${port}`, 'Admin API');
  });
}

bootstrap();
