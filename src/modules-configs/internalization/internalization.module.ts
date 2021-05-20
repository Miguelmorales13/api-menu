import { DynamicModule, Module } from '@nestjs/common';
import * as i18n from 'i18n';
import { InternalizationService } from './internalization.service';

@Module({})
export class InternalizationModule {
  static register(configure: i18n.ConfigurationOptions): DynamicModule {
    i18n.configure(configure);
    return {
      module: InternalizationModule,
      providers: [InternalizationService],
      exports: [InternalizationService],
    };
  }
}
