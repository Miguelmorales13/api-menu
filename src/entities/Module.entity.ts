import {
  Column,
  DataType,
  DefaultScope,
  HasMany,
  Table,
} from 'sequelize-typescript';
import { Access } from './Access.entity';
import { General } from './General.entity';

/**
 * type module
 * 1. Administratrator
 * 2. Client
 */
export type typeModule = '1' | '2';

/**
 * Entity  rol
 */
@DefaultScope(() => ({
  include: [
    {
      model: Access,
    },
  ],
}))
@Table({
  paranoid: true,
  timestamps: true,
  underscored: true,
  tableName: 'modules',
})
export class Module extends General<Module> {
  /**
   * Name  of rol
   */
  @Column({ type: DataType.STRING(100), allowNull: false })
  name: string;
  /**
   * Key name of rol admin
   */
  @Column({ type: DataType.STRING(100), allowNull: false })
  keyName: string;
  @Column({ type: DataType.STRING(50), allowNull: false })
  icon: string;

  /**
   * Description  of module
   */
  @Column({ type: DataType.STRING(200), allowNull: false })
  description: string;

  @HasMany(() => Access)
  access?: Access[];
}
