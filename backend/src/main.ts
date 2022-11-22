import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { ExceptionTrapFilter } from './filter/exception-trap.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new ExceptionTrapFilter(httpAdapterHost));
  app.setGlobalPrefix('/api');
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Visualization Screen')
    .setDescription('Visualization Screen Backend API')
    .setVersion('0.0.1')
    .addTag('visualization-screen')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('help/api', app, document);

  await app.listen(8202);
}
bootstrap();
