import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('API de Produtos e Pedidos')
    .setDescription('API desenvolvida para o teste técnico Fullstack')
    .setVersion('1.0')
    .addTag('Produtos')
    .addTag('Pedidos')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  await app.listen(3001);
  console.log('Server running on http://localhost:3001');
  console.log('Swagger running on http://localhost:3001/api/docs');
}
bootstrap();