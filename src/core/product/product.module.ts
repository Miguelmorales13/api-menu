import { Module } from '@nestjs/common';
import { ConfigModule } from '../../config/config.module';
import { HelpersModule } from '../../helpers/helpers.module';
import { DatabaseModule } from '../../providers/database.module';
import { ProductController } from './product.controller';
import { productsProviders } from './product.provider';
import { ProductService } from './product.service';

@Module({
  imports: [DatabaseModule, HelpersModule, ConfigModule],
  providers: [ProductService, ...productsProviders],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}
