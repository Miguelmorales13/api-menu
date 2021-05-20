import {
  HttpModule,
  MiddlewareConsumer,
  Module,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { ConfigService } from './config/config.service';
import * as path from 'path';
import { MulterModule } from '@nestjs/platform-express';
import { InternalizationModule } from './modules-configs/internalization/internalization.module';
import { UserModule } from './core/user/user.module';
import { AuthModule } from './core/auth/auth.module';
import { ModuleModule } from './core/modules/module.module';
import { RolModule } from './core/rol/rol.module';
import { HelpersModule } from './helpers/helpers.module';
import { CategoryModule } from './core/category/category.module';
import { SubcategoryModule } from './core/subcategory/subcategory.module';
import { ProductModule } from './core/product/product.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { HttpErrorFilter } from './filters/http-error.filter';
import { LoggerInterceptor } from './interceptors/logger.interceptor';
import { config } from 'dotenv';
import { ServeStaticModule } from '@nestjs/serve-static';
import { LoggerMiddleware } from './middlewares/logger.middleware';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: path.join(__dirname, '..', 'public', 'uploads'),
      renderPath: '/uploads',
      serveRoot: '/uploads',
    }),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (_config: ConfigService) => ({
        dest: path.join(__dirname, _config.get('MULTER_DEST')),
      }),
      inject: [ConfigService],
    }),
    InternalizationModule.register({
      locales: ['en', 'es'],
      directory: path.resolve(__dirname, '..', 'languages'),
      objectNotation: true,
      updateFiles: false,
    }),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (_config: ConfigService) => ({
        timeout: _config.get('HTTP_TIMEOUT'),
        maxRedirects: _config.get('HTTP_MAX_REDIRECTS'),
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    ModuleModule,
    RolModule,
    ConfigModule,
    HelpersModule,
    CategoryModule,
    SubcategoryModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
  ],
})
export class AppModule {
  constructor() {
    config();
  }
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
