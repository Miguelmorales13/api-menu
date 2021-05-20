import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { General } from '../general.dto';
import {
  permissionAccess,
  permissionAccessEnum,
} from '../../entities/AccessesRolUser.entity';

let accessListExample = [
  { accessId: 10, permission: '0' },
  { accessId: 11, permission: '0' },
  { accessId: 12, permission: '0' },
  { accessId: 13, permission: '0' },
];

/**
 * RoAdminl dto
 */
export class AccessDTO {
  @ApiProperty({
    description: 'this is the access identifier',
    type: 'string',
  })
  @IsString({ message: 'rols.access.name_required' })
  accessId: string;

  @ApiProperty({
    description: 'This is permission to be assigned',
    enum: permissionAccessEnum,
  })
  @IsEnum(permissionAccessEnum, {
    message: 'rols.access.permission_required',
  })
  permission: permissionAccess;
}
export class RolDTO {
  @ApiProperty({ description: 'This is the name of the role' })
  @MaxLength(100, { message: 'rols.name_max' })
  @IsString({ message: 'rols.name_required' })
  name?: string;

  @ApiProperty({
    description: 'these are the accesses that will be assigned to that role',
    isArray: true,
    type: AccessDTO,
    example: accessListExample,
  })
  @IsNotEmpty({ message: 'rols.invalid_access' })
  access?: AccessDTO[];
}

export class RolUpdateDTO extends IntersectionType(General, RolDTO) {}
export class RolResponseDTO {
  @ApiProperty({
    description: 'This is the data that answers you',
    type: RolUpdateDTO,
  })
  data: RolUpdateDTO;
  @ApiProperty({
    description: 'This is the server message',
    default: 'successful petition',
  })
  message: string;
}
