import { Module } from '@nestjs/common';

import { DatabaseModule } from '../../providers/database.module';
import { ModuleController } from './module.controller';
import { usersProviders } from './module.provider';
import { ModuleService } from './module.service';
import { HelpersModule } from '../../helpers/helpers.module';
import { ConfigModule } from '../../config/config.module';

@Module({
  imports: [DatabaseModule, HelpersModule, ConfigModule],
  providers: [ModuleService, ...usersProviders],
  controllers: [ModuleController],
  exports: [ModuleService],
})
export class ModuleModule {}
