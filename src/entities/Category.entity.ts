import * as bcrypt from 'bcrypt';
import {
  Column,
  Table,
  DataType,
  Is,
  DefaultScope,
  HasMany,
} from 'sequelize-typescript';

import { generatePassword } from '../config/constants';
import { General } from './General.entity';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Rol } from './Rol.entity';
import { Access } from './Access.entity';
import { Subcategory } from './Subcategory.entity';

/**
 * Entity user
 */
@DefaultScope(() => ({}))
@Table({
  paranoid: true,
  timestamps: true,
  underscored: true,
})
export class Category extends General<Category> {
  @Is(async function Unique(value: string) {
    let name = await Category.findOne({
      where: { name: value.toLowerCase() },
      attributes: ['id'],
    });
    if (name && name.id != this.id)
      throw new Error('validations.categories.name_already_exist');
  })
  @Column({ type: DataType.STRING(100), allowNull: false })
  name?: string;

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
    allowNull: false,
  })
  description?: string;

  @HasMany(() => Subcategory)
  subcategories?: Subcategory[];
}
