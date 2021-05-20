import {
  Column,
  ForeignKey,
  Model,
  Table,
  DataType,
} from 'sequelize-typescript';
import { Access } from './Access.entity';
import { Rol } from './Rol.entity';
/**
 * Entity  rol
 */
export type permissionAccess = '0' | '1' | '2';
export enum permissionAccessEnum {
  NoAccess = '0',
  Read = '1',
  Write = '2',
}

/**
 * Entity  rol
 */
@Table({
  underscored: true,
  tableName: 'accesses_rol_users',
})
export class AccessRolUser extends Model<AccessRolUser> {
  @ForeignKey(() => Rol)
  @Column
  rolId: number;

  @ForeignKey(() => Access)
  @Column
  accessId: number;

  @Column({ type: DataType.ENUM('0', '1', '2'), defaultValue: '0' })
  permission: permissionAccess;
}
