import { Module } from '@nestjs/common';
import { ConfigModule } from '../../config/config.module';
import { HelpersModule } from '../../helpers/helpers.module';
import { DatabaseModule } from '../../providers/database.module';
import { CategoryController } from './category.controller';
import { categoriesProviders } from './category.provider';
import { CategoryService } from './category.service';

@Module({
  imports: [DatabaseModule, HelpersModule, ConfigModule],
  providers: [CategoryService, ...categoriesProviders],
  controllers: [CategoryController],
  exports: [CategoryService],
})
export class CategoryModule {}
