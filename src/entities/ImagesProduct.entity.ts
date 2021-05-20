import * as bcrypt from 'bcrypt';
import {
  BeforeCreate,
  BelongsTo,
  Column,
  ForeignKey,
  Table,
  DataType,
  NotNull,
  Is,
  AfterFind,
  DefaultScope,
} from 'sequelize-typescript';

import { generatePassword } from '../config/constants';
import { General } from './General.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Rol } from './Rol.entity';
import { Access } from './Access.entity';
import { Category } from './Category.entity';
import { Product } from './Product.entity';

/**
 * Entity user
 */
@DefaultScope(() => ({}))
@Table({
  paranoid: true,
  timestamps: true,
  underscored: true,
})
export class ImageProduct extends General<ImageProduct> {
  @Column({
    type: DataType.STRING(120),
    allowNull: false,
    get() {
      if (this.getDataValue('photo') == '') {
        return this.getDataValue('photo');
      } else {
        return `${process.env.HOST_COMPLETE}/uploads/images/${this.getDataValue(
          'photo',
        )}`;
      }
    },
  })
  photo?: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
    defaultValue: '',
  })
  description?: string;

  @ForeignKey(() => Product)
  @Column({ type: DataType.INTEGER, allowNull: false })
  productId?: number;

  @BelongsTo(() => Product)
  product?: Product;
}
