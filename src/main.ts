import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('TODO List NestJS API')
    .setDescription('Api criada em aula utilizando NestJS e mySQL - Generation Brasil')
    .setContact('Samuel Gomes', 'https://www.linkedin.com/in/samuel-gomes-santos/', 'contatodevmuca@gmail.com')
    .setVersion('1.0')
    .build()

  // aqui conseguimos criar os nossos endpoints da api e a configuração da nossa documentação
  const document = SwaggerModule.createDocument(app, config) 
  SwaggerModule.setup('/swagger', app, document)

  process.env.TZ = '-03:00'

  app.useGlobalPipes(new ValidationPipe())
  app.enableCors()
  app.listen(process.env.PORT || 3000)
}
bootstrap()
