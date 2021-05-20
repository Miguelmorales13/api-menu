import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

/**
 * Reset password dto
 */
export class ResetPasswordDTO {
  @ApiProperty({ description: 'Password', type: 'string' })
  @IsString({ message: 'auth.before_password_required' })
  oldPassword?: string;

  @ApiProperty({ description: 'Password', type: 'string' })
  @IsString({ message: 'auth.new_password_required' })
  newPassword?: string;

  @ApiProperty({ description: 'Password', type: 'string' })
  @IsString({ message: 'auth.repeat_new_password_required' })
  repeatNewPassword?: string;
}
