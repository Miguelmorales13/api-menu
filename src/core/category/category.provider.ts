import { Category } from '../../entities/Category.entity';

export const categoriesProviders = [
  {
    provide: 'CATEGORIES_REPOSITORY',
    useValue: Category,
  },
];
