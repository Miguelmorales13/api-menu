import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

/**
 * User dto
 */
export class ModuleDTO {
  id?: number;

  @ApiProperty({ description: 'name to user DTO' })
  @IsString({ message: 'users.name_required' })
  name?: string;
}
