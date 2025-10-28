import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Swagger konfiguratsiyasi
  const config = new DocumentBuilder()
    .setTitle('Sevimli Play API')
    .setDescription('NestJS + TypeORM + PostgreSQL')
    .setVersion('1.0')
    .addBearerAuth(
      // ✅ JWT token uchun qo‘shildi
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        description: 'Bearer token kiriting',
        in: 'header',
      },
      'access-token', // bu nom Swagger’da Authorize bosilganda ko‘rinadi
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);

  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📘 Swagger Docs: http://localhost:${PORT}/api`);
}

bootstrap();
