import { Module } from '../../entities/Module.entity';

export const usersProviders = [
  {
    provide: 'MODULES_REPOSITORY',
    useValue: Module,
  },
];
