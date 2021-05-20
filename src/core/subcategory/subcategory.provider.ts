import { Subcategory } from '../../entities/Subcategory.entity';

export const subcategoriesProviders = [
  {
    provide: 'SUBCATEGORIES_REPOSITORY',
    useValue: Subcategory,
  },
];
