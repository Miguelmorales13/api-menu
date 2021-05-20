import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { General } from '../general.dto';

/**
 * Category dto
 */
export class CategoryDto {
  @ApiProperty()
  @IsString({ message: 'categories.name_required' })
  name?: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  photo?: string;
  @ApiProperty()
  @IsString({ message: 'categories.description_required' })
  description?: string;
}

export class CategoryUpdateDTO extends IntersectionType(General, CategoryDto) {}
