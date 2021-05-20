import { Column, DataType, HasMany, Table } from 'sequelize-typescript';
import { General } from './General.entity';
import { Image } from './Image.entity';

/**
 * Entity  rol
 */
@Table({
  paranoid: true,
  timestamps: true,
  underscored: true,
})
export class CategoryImages extends General<CategoryImages> {
  @Column({ type: DataType.STRING(100), allowNull: false })
  name?: string;

  @Column({ type: DataType.STRING(200), allowNull: true })
  description?: string;

  @Column({ defaultValue: false, allowNull: false })
  isSystem?: boolean;

  @HasMany(() => Image)
  images?: Image[];
}
