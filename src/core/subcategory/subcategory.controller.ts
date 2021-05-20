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
import { Subcategory } from '../../entities/Subcategory.entity';
import { SubcategoryDto, SubcategoryUpdateDTO } from './subcategory.dto';
import { SubcategoryService } from './subcategory.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { generateStorageMulter } from '../../config/constants';
import { Category } from '../../entities/Category.entity';
import { AuthGuard } from '@nestjs/passport';

/**
 * Controller subcategories
 */
@ApiTags('Subcategories')
@Controller('subcategories')
// @UseGuards(AuthGuard('jwt'))
// @ApiBearerAuth()
export class SubcategoryController {
  constructor(private readonly subcategories: SubcategoryService) {}

  /**
   * Gets all
   * @returns all
   */
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get()
  async getAll(): Promise<Subcategory[]> {
    let data = await this.subcategories.getAll({ include: [Category] });
    return data;
  }

  @Get('app')
  async getAllApp(
    @Query('categoryId') categoryId: string,
  ): Promise<Subcategory[]> {
    let data = await this.subcategories.getAll({
      where: { categoryId },
      include: [Category],
    });
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
  async getById(@Param('id') id: number): Promise<Subcategory> {
    return await this.subcategories.getOne(id);
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
    @Body() subcategory: SubcategoryDto,
    @UploadedFiles() files,
  ): Promise<Subcategory> {
    console.log(files);
    if (!files || !files[0] || !files[0].filename) {
      throw new HttpException(
        'errors.subcategories.photo_not_found',
        HttpStatus.NOT_FOUND,
      );
    }
    let photo = files[0].filename;
    return await this.subcategories.create({ ...subcategory, photo });
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
    @Body() category: SubcategoryUpdateDTO,
    @Param('id') id: number,
    @UploadedFiles() files,
  ): Promise<Subcategory> {
    let photo = false;
    if (files && files[0] && files[0].filename) {
      photo = true;
    }
    return await this.subcategories.update(
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
    return await this.subcategories.delete(id);
  }
}
