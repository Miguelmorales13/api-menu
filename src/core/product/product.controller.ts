import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Product } from '../../entities/Product.entity';
import { ProductDto, ProductUpdateDTO } from './product.dto';
import { ProductService } from './product.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { generateStorageMulter } from '../../config/constants';
import { AuthGuard } from '@nestjs/passport';

/**
 * Controller products
 */
@ApiTags('Products')
@Controller('products')
// @UseGuards(AuthGuard('jwt'))
// @ApiBearerAuth()
export class ProductController {
  constructor(private readonly products: ProductService) {}

  /**
   * Gets all
   * @returns all
   */
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get()
  async getAll(): Promise<Product[]> {
    let data = await this.products.getAll();
    return data;
  }

  @Get('app')
  async getAllApp(
    @Query('subcategoryId') categoryId: number,
  ): Promise<Product[]> {
    let data = await this.products.getAll({ where: { categoryId } });
    return data;
  }

  /**
   * Gets by id
   * @param id
   * @returns by id
   */
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get(':id')
  async getById(@Param('id') id: number): Promise<Product> {
    return await this.products.getOne(id);
  }

  /**
   * Creates category controller
   * @param category
   * @returns create
   */
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FilesInterceptor('photo', 1, generateStorageMulter('images', 5)),
  )
  async create(
    @Body() category: ProductDto,
    @UploadedFiles() files: any,
  ): Promise<Product> {
    if (!files || !files[0] || !files[0].filename) {
      throw new HttpException(
        'errors.categories.photo_not_found',
        HttpStatus.NOT_FOUND,
      );
    }
    let photo = files[0].filename;
    return await this.products.create({ ...category, photo });
  }

  /**
   * Updates category controller
   * @param category
   * @param id
   * @returns update
   */
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Put(':id')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FilesInterceptor('photo', 1, generateStorageMulter('images', 5)),
  )
  async update(
    @Body() category: ProductUpdateDTO,
    @Param('id') id: number,
    @UploadedFiles() files: any,
  ): Promise<Product> {
    let photo = false;
    if (files && files[0] && files[0].filename) {
      photo = true;
    }
    return await this.products.update(
      {
        ...category,
        photo: photo
          ? files[0].filename
          : category.photo.replace(
              `${process.env.HOST_COMPLETE}/uploads/images/`,
              '',
            ),
      },
      id,
    );
  }

  /**
   * Deletes category controller
   * @param id
   * @returns delete
   */
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<number> {
    return await this.products.delete(id);
  }
}
