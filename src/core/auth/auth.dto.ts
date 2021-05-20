import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

/**
 * Auth dto
 */
export class AuthDTO {
  /**
   * User  of auth dto
   */
  @ApiProperty({ description: 'user to login' })
  @IsString({ message: 'auth.user_required' })
  user?: string;

  /**
   * Password  of auth dto
   */
  @ApiProperty({ description: 'password to login' })
  @IsString({ message: 'auth.password_required' })
  password?: string;
}
