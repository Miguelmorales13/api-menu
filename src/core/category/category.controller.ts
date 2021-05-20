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
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Category } from '../../entities/Category.entity';
import { CategoryDto, CategoryUpdateDTO } from './category.dto';
import { CategoryService } from './category.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { generateStorageMulter } from '../../config/constants';
import { AuthGuard } from '@nestjs/passport';

/**
 * Controller categories
 */
@ApiTags('Categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categories: CategoryService) {}

  /**
   * Gets all
   * @returns all
   */
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get()
  async getAll(): Promise<Category[]> {
    let data = await this.categories.getAll();
    return data;
  }

  @Get('app')
  async getAllApp(): Promise<Category[]> {
    let data = await this.categories.getAll();
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
  async getById(@Param('id') id: number): Promise<Category> {
    return await this.categories.getOne(id);
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
    @Body() category: CategoryDto,
    @UploadedFiles() files,
  ): Promise<Category> {
    if (!files || !files[0] || !files[0].filename) {
      throw new HttpException(
        'errors.categories.photo_not_found',
        HttpStatus.NOT_FOUND,
      );
    }
    let photo = files[0].filename;
    console.log(category, photo);
    return await this.categories.create({ ...category, photo });
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
    @Body() category: CategoryUpdateDTO,
    @Param('id') id: number,
    @UploadedFiles() files,
  ): Promise<Category> {
    let photo = false;
    if (files && files[0] && files[0].filename) {
      photo = true;
    }
    return await this.categories.update(
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
    return await this.categories.delete(id);
  }
}
