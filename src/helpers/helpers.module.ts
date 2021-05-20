import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { DatabaseModule } from '../providers/database.module';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { EmailsService } from './emails/emails.service';
import { GateLoggerGateway } from './logger/gate-logger.gateway';
import { LoggerService } from './logger/logger.service';

@Module({
  imports: [ConfigModule, DatabaseModule],
  providers: [
    EmailsService,
    LoggerService,
    GateLoggerGateway,
    CloudinaryService,
  ],
  exports: [EmailsService, LoggerService, GateLoggerGateway, CloudinaryService],
})
export class HelpersModule {}
