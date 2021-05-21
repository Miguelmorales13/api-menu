import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as compression from 'compression';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { executeData } from './seeds/first.seed';
import { ValidatorPipe } from './pipes/validator.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
    cors: true,
  });
  app.enableCors();
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Menu api')
    .setDescription('This API is used in app https://miguelmorales13.github.io/menu-vue/')
    .setVersion('1.0')
    .setBasePath('/api/')
    .build();
  app.use(compression());

  app.setGlobalPrefix('api');
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidatorPipe());
  await app.listen(process.env.PORT);
  await executeData();
  console.log(`listen in port http://${process.env.HOST}:${process.env.PORT}`);
}
bootstrap();
