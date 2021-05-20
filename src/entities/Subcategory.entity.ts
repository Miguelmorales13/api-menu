import {
  BelongsTo,
  Column,
  DataType,
  DefaultScope,
  ForeignKey,
  Is,
  Table,
} from 'sequelize-typescript';
import { General } from './General.entity';
import { Category } from './Category.entity';

/**
 * Entity user
 */
@DefaultScope(() => ({
  include: [Category],
}))
@Table({
  paranoid: true,
  timestamps: true,
  underscored: true,
})
export class Subcategory extends General<Subcategory> {
  @Is(async function Unique(value: string) {
    let name = await Subcategory.findOne({
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

  @ForeignKey(() => Category)
  @Column({ type: DataType.INTEGER, allowNull: false })
  categoryId?: number;

  @BelongsTo(() => Category)
  category?: Category;
}
