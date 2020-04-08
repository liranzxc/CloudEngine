import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Songs library')
    .setDescription('Songs library API for cloud computing course in AFEKA')
    .setVersion('1.0')
    .addTag('Songs')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swagger', app, document);

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  console.log(`server listen on port ${PORT}`)
}
bootstrap();
