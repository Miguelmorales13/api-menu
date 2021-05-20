import { Inject, Injectable } from '@nestjs/common';
import { SequelizeCrudService } from '../../crud/SequelizeCrudService';
import { Rol } from '../../entities/Rol.entity';
import { RolDTO } from './rol.dto';
import { FindOptions } from 'sequelize';
import { AccessRolUser } from '../../entities/AccessesRolUser.entity';
import { User } from '../../entities/User.entity';

/**
 * Injectable Rol Service
 */
@Injectable()
export class RolService extends SequelizeCrudService<Rol, RolDTO> {
  constructor(@Inject('ROLES_REPOSITORY') readonly roles: typeof Rol) {
    super(roles);
  }
  async getAll(
    options?: FindOptions,
    lang: string = process.env.LANG_DEFAULT,
  ): Promise<Rol[]> {
    return await this.roles
      .scope({ method: ['accessList'] })
      .findAll(options || null);
  }
  async getOne(
    id: number,
    options?: FindOptions,
    lang: string = process.env.LANG_DEFAULT,
  ): Promise<any> {
    let rol = await this.roles
      .scope({ method: ['accessList'] })
      .findByPk(id, options);
    // console.log(rol, lang);
    return rol;
  }
  async getOneUser(
    id: number,
    options?: FindOptions,
    lang: string = process.env.LANG_DEFAULT,
  ): Promise<any> {
    let rol = await this.roles
      .scope({ method: ['accessList'] })
      .findByPk(id, { ...options, include: [User] });
    // console.log(rol, lang);
    return rol;
  }
  async create(
    item: Partial<RolDTO>,
    lang: string = process.env.LANG_DEFAULT,
  ): Promise<Rol> {
    let itemCreated = await this.roles.create(item as any);
    await AccessRolUser.bulkCreate(
      item.access.map((access) => ({
        ...access,
        rolId: itemCreated.id,
      })) as any[],
    );
    return this.getOne(itemCreated.id, null, lang);
  }
  async update(
    item: Partial<RolDTO>,
    id: number,
    lang: string = process.env.LANG_DEFAULT,
  ): Promise<Rol> {
    let wanted = await this.roles.findByPk(id);
    await wanted.update({ name: item.name });
    let accessWanted = await AccessRolUser.destroy({ where: { rolId: id } });
    let responses = await AccessRolUser.bulkCreate(
      item.access.map((access) => ({ ...access, rolId: id })) as any[],
    );
    return this.getOne(id, null, lang);
  }
}
