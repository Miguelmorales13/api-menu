import { Inject, Injectable } from '@nestjs/common';
import { SequelizeCrudService } from '../../crud/SequelizeCrudService';
import { Subcategory } from '../../entities/Subcategory.entity';
import { SubcategoryDto } from './subcategory.dto';

/**
 * Injectable
 * SubcategoryService
 */
@Injectable()
export class SubcategoryService extends SequelizeCrudService<
  Subcategory,
  SubcategoryDto
> {
  constructor(
    @Inject('SUBCATEGORIES_REPOSITORY')
    readonly subcategories: typeof Subcategory,
  ) {
    super(subcategories);
  }
}
