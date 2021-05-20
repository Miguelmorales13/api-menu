import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

import { ConfigModule } from '../../config/config.module';
import { ConfigService } from '../../config/config.service';
import { HelpersModule } from '../../helpers/helpers.module';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './auth.strategy';

@Module({
  imports: [
    UserModule,
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (_config: ConfigService) => ({
        secret: _config.get('TOKEN_SECRET'),

        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
    HelpersModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
