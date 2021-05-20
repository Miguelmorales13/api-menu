import { ACCESSES, MODULES, ROLES, USERS } from '../config/constants';
import { Access } from '../entities/Access.entity';
import { Module } from '../entities/Module.entity';
import { Rol } from '../entities/Rol.entity';
import { User } from '../entities/User.entity';
import { AccessRolUser } from '../entities/AccessesRolUser.entity';
async function executeModules() {
  let notCreated = [];
  for (const module of MODULES) {
    let wanted = await Module.findByPk(module.id, { logging: true });
    if (wanted) {
      wanted.update({ ...module });
    } else {
      notCreated = [...notCreated, module];
    }
  }
  if (notCreated.length > 0) {
    await Module.bulkCreate(notCreated);
  }
}

async function executeAccesses() {
  let notCreated = [];
  for (const access of ACCESSES) {
    let wanted = await Access.findByPk(access.id, { logging: true });
    if (wanted) {
      wanted.update({ ...access });
    } else {
      notCreated = [...notCreated, access];
    }
  }
  if (notCreated.length > 0) {
    await Access.bulkCreate(notCreated);
  }
}

async function executeRoles() {
  for (const rol of ROLES) {
    let wanted = await Rol.findByPk(rol.id, { logging: true });
    if (!wanted) {
      await Rol.create({ ...rol, id: null } as any);
      await AccessRolUser.bulkCreate(
        ACCESSES.map((access) => ({
          accessId: access.id,
          permission: '2',
          rolId: rol.id,
        })) as any[],
      );
    }
  }
}
async function executeUsers() {
  for (const user of USERS) {
    let wanted = await User.findByPk(user.id, { logging: true });
    if (!wanted) {
      await User.create({ ...user, id: null } as any);
    }
  }
}

export async function executeData() {
  await executeModules();
  await executeAccesses();
  await executeRoles();
  await executeUsers();
}
