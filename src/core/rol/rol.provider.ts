import { Rol } from '../../entities/Rol.entity';

export const rolesProviders = [
  {
    provide: 'ROLES_REPOSITORY',
    useValue: Rol,
  },
];
