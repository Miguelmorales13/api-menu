import { HttpException, HttpStatus } from '@nestjs/common';
import {
  BelongsTo,
  Column,
  DefaultScope,
  ForeignKey,
  Is,
  Table,
} from 'sequelize-typescript';
import { CategoryImages } from './CategoriesImages.entity';
import { General } from './General.entity';

/**
 * Entity  images
 */
@DefaultScope(() => ({
  include: [
    {
      model: CategoryImages,
      required: true,
    },
  ],
}))
@Table({
  paranoid: true,
  timestamps: true,
  underscored: true,
})
export class Image extends General<Image> {
  @Is(async function Unique(value: string) {
    let image = await Image.findOne({
      where: { title: value },
      attributes: ['id'],
    });
    if (image)
      throw new HttpException('Titulo ya registrado', HttpStatus.CONFLICT);
  })
  @Column({ allowNull: false })
  title?: string;

  @Column
  description?: string;

  @Column({ allowNull: false })
  url?: string;

  @Column({ allowNull: true })
  public_id: string;

  @ForeignKey(() => CategoryImages)
  @Column({ allowNull: false })
  categoryId?: number;

  @BelongsTo(() => CategoryImages)
  category: CategoryImages;
}
