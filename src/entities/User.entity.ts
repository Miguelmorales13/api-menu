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

/**
 * Entity user
 */
@DefaultScope(() => ({
  include: [
    {
      model: Rol,
      required: true,
      include: [
        {
          attributes: ['moduleId', 'name', 'keyName'],
          model: Access,
          through: {
            attributes: ['accessId', 'permission'],
          },
        },
      ],
    },
  ],
}))
@Table({
  paranoid: true,
  timestamps: true,
  underscored: true,
  tableName: 'users',
})
export class User extends General<User> {
  @Column({ type: DataType.STRING(100), allowNull: false })
  name?: string;

  // @Is(async function Unique(value: string) {
  // 	let user = await User.findOne({ where: { user: value, companyId: this.companyId }, attributes: ['id', 'companyId'] })
  // 	// let user = await User.findOne({ where: { user: value,companyId:this.companyId }, attributes: ['id','companyId'] })
  // 	if (user && user.id != this.id) throw new Error('validations.users.user_already_exist');
  // })
  @Column({ type: DataType.STRING(100), allowNull: false })
  user?: string;

  @Is(async function Unique(value: string) {
    let user = await User.findOne({
      where: { email: value.toLowerCase() },
      attributes: ['id'],
    });
    if (user && user.id != this.id)
      throw new Error('validations.users.email_already_exist');
  })
  @Column({
    type: DataType.STRING(200),
    allowNull: false,
    set(value: string) {
      this.setDataValue('email', value.toLowerCase());
    },
  })
  email?: string;

  @Column({ type: DataType.STRING(60) })
  password?: string;

  @Column({ type: DataType.STRING(100), allowNull: false })
  lastName?: string;

  @Column({ type: DataType.STRING(100), allowNull: false })
  secondLastName?: string;

  @Column({ allowNull: false, defaultValue: true })
  firstLogin?: boolean;

  @ForeignKey(() => Rol)
  @Column({ type: DataType.INTEGER, allowNull: false })
  rolId?: number;

  @BelongsTo(() => Rol)
  rol?: Rol;

  @Column({ defaultValue: true, allowNull: false })
  active?: boolean;

  @BeforeCreate
  static async setPassword(instance: User) {
    instance.password = await bcrypt.hashSync(instance.password, 10);
  }

  async comparePassword(compare: string) {
    return await bcrypt.compareSync(compare, this.password);
  }
}
