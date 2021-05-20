import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsNumberString } from 'class-validator';
import { General } from '../general.dto';

/**
 * Category dto
 */
export class SubcategoryDto {
  @ApiProperty({ type: 'file', format: 'string', required: false })
  photo?: string;
  @ApiProperty()
  description?: string;
  @ApiProperty()
  @IsNumberString(
    {},
    { message: 'validations.subcategories.category_required' },
  )
  categoryId?: number;
}
export class SubcategoryUpdateDTO extends IntersectionType(
  General,
  SubcategoryDto,
) {}
