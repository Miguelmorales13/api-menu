import {
  BelongsToMany,
  Column,
  DataType,
  HasMany,
  Is,
  Scopes,
  Sequelize,
  Table,
} from 'sequelize-typescript';
import { Access } from './Access.entity';
import { AccessRolUser } from './AccessesRolUser.entity';
import { General } from './General.entity';
import { User } from './User.entity';

/**
 * Entity  rol
 */
@Scopes({
  accessList() {
    return {
      include: [
        {
          attributes: [
            'moduleId',
            'name',
            'keyName',
            ['id', 'accessId'],
            [
              Sequelize.literal('"access->AccessRolUser"."permission"'),
              'permission',
            ],
          ],
          model: Access,
          through: {
            attributes: [],
          },
        },
      ],
    };
  },
})
@Table({
  paranoid: true,
  timestamps: true,
  underscored: true,
  tableName: 'roles',
})
export class Rol extends General<Rol> {
  /**
   * Name  of rol
   */
  @Is(async function Unique(value: string) {
    let rol = await Rol.findOne({ where: { name: value }, attributes: ['id'] });
    if (rol && rol.id != this.id)
      throw new Error('errors.roles.name_already_exist');
  })
  @Column({ type: DataType.STRING(100), allowNull: false })
  name: string;
  /**
   * Access  of rol
   */
  @BelongsToMany(() => Access, () => AccessRolUser)
  access?: Access[] | any;

  @HasMany(() => User)
  users?: User[];
}
