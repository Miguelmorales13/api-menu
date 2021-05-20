import { Inject, Injectable } from '@nestjs/common';
import { SequelizeCrudService } from '../../crud/SequelizeCrudService';
import { Category } from '../../entities/Category.entity';
import { CategoryDto } from './category.dto';

/**
 * Injectable
 * ProductService
 */
@Injectable()
export class CategoryService extends SequelizeCrudService<
  Category,
  CategoryDto
> {
  constructor(
    @Inject('CATEGORIES_REPOSITORY') readonly categories: typeof Category,
  ) {
    super(categories);
  }
}
