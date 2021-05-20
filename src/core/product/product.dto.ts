import { ApiProperty, IntersectionType } from '@nestjs/swagger';
import { IsNumberString, IsString } from 'class-validator';
import { General } from '../general.dto';

/**
 * Category dto
 */
export class ProductDto {
  @ApiProperty()
  @IsString({ message: 'products.name_required' })
  name?: string;
  @ApiProperty()
  @IsNumberString({}, { message: 'products.price_required' })
  price?: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  photo?: string;

  @ApiProperty()
  description?: string;
  @IsNumberString({}, { message: 'validations.products.category_required' })
  categoryId?: number;
}

export class ProductUpdateDTO extends IntersectionType(General, ProductDto) {}
