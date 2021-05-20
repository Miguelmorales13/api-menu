import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { General } from '../general.dto';

/**
 * User dto
 */
export class UserDTO {
  @ApiProperty({ description: 'name to user DTO' })
  @IsString({ message: 'users.name_required' })
  name?: string;

  @ApiProperty({ description: 'user to user DTO' })
  // @IsString({ message: 'El usuario es requerido' })
  user?: string;

  @ApiProperty({ description: 'email to user DTO' })
  @IsString({ message: 'users.email_required' })
  @IsEmail({}, { message: 'users.format_invalid_email' })
  email?: string;

  // @ApiProperty({ description: 'password to user DTO' })
  // @IsString({ message: 'Contraseña requerida' })
  password?: string;

  @ApiProperty({ description: 'last name to user DTO' })
  @IsString({ message: 'users.last_name_required' })
  lastName?: string;

  // @ApiProperty({ description: 'rol to user DTO' })
  // @IsNumber({}, { message: 'users.rol_id_required' })
  // rolId?: number;

  // @ApiProperty({ description: 'rol to user DTO', required: false, type: RolDTO })
  // rol?: RolDTO;
}
export class UserUpdateDTO extends IntersectionType(General, UserDTO) {}
