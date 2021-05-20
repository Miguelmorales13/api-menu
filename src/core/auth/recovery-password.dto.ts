import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

/**
 * Recovery passoword dto
 */
export class RecoveryPasswordDTO {
  @ApiProperty({ description: 'Email to reset password', type: 'string' })
  @IsString({ message: 'auth.user_required' })
  @IsEmail({}, { message: 'auth.format_invalid_email' })
  email?: string;
}
