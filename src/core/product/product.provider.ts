import { Product } from '../../entities/Product.entity';
import { ImageProduct } from '../../entities/ImagesProduct.entity';

export const productsProviders = [
  {
    provide: 'PRODUCTS_REPOSITORY',
    useValue: Product,
  },
  {
    provide: 'IMAGES_PRODUCTS_REPOSITORY',
    useValue: ImageProduct,
  },
];
