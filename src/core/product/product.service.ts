import { Inject, Injectable } from '@nestjs/common';
import { SequelizeCrudService } from '../../crud/SequelizeCrudService';
import { Product } from '../../entities/Product.entity';
import { ProductDto } from './product.dto';
import { ImageProduct } from '../../entities/ImagesProduct.entity';

/**
 * Injectable
 * ProductService
 */
@Injectable()
export class ProductService extends SequelizeCrudService<Product, ProductDto> {
  constructor(
    @Inject('PRODUCTS_REPOSITORY') readonly products: typeof Product,
    @Inject('IMAGES_PRODUCTS_REPOSITORY') readonly images: typeof ImageProduct,
  ) {
    super(products);
  }

  async create(item: Partial<ProductDto>): Promise<Product> {
    let itemCreated = await this.products.create(item as any);
    return this.getOne(itemCreated.id);
  }
}
