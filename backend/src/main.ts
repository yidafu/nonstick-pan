import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Visualization Screen')
    .setDescription('Visualization Screen Backend API')
    .setVersion('0.0.1')
    .addTag('visualization-screen')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('help/api', app, document);

  await app.listen(3000);
}
bootstrap();
