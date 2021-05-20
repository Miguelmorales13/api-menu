import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../providers/database.module';
import { RolController } from './rol.controller';
import { rolesProviders } from './rol.provider';
import { RolService } from './rol.service';

@Module({
  imports: [DatabaseModule],
  providers: [RolService, ...rolesProviders],
  controllers: [RolController],
  exports: [RolService],
})
export class RolModule {}
