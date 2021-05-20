import { Module } from '@nestjs/common';
import { ConfigModule } from '../../config/config.module';
import { HelpersModule } from '../../helpers/helpers.module';
import { DatabaseModule } from '../../providers/database.module';
import { SubcategoryController } from './subcategory.controller';
import { subcategoriesProviders } from './subcategory.provider';
import { SubcategoryService } from './subcategory.service';

@Module({
  imports: [DatabaseModule, HelpersModule, ConfigModule],
  providers: [SubcategoryService, ...subcategoriesProviders],
  controllers: [SubcategoryController],
  exports: [SubcategoryService],
})
export class SubcategoryModule {}
