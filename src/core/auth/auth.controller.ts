import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AuthDTO } from './auth.dto';
import { AuthService } from './auth.service';
import { RecoveryPasswordDTO } from './recovery-password.dto';
import { ResetPasswordDTO } from './reset-password.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserRequest } from '../../decorators/User.decoraton';

/**
 * Auth controller
 */
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private _auth: AuthService) {}

  /**
   * Logins auth controller
   * @param user
   * @returns
   */

  @Post('sign-in')
  async login(@Body() user: AuthDTO) {
    let data = await this._auth.login(user);
    return data;
  }

  /**
   * Recoverys password
   * @param recovery
   * @returns
   */
  @Post('recovery-password')
  async recoveryPassword(@Body() recovery: RecoveryPasswordDTO) {
    return this._auth.recoveryPassword(recovery);
  }

  /**
   * Resets password
   * @param reset
   * @param req
   * @returns
   */
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post('change-password')
  async resetPassword(
    @Body() reset: ResetPasswordDTO,
    @UserRequest('id') id: any,
  ) {
    return this._auth.changePassword(reset, id);
  }
}
