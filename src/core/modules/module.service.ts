import { Inject, Injectable } from '@nestjs/common';

import { SequelizeCrudService } from '../../crud/SequelizeCrudService';
import { ModuleDTO } from './module.dto';
import { translate } from '../../config/constants';
import { Module } from '../../entities/Module.entity';

/**
 * Injectable
 * ModuleService
 */
@Injectable()
export class ModuleService extends SequelizeCrudService<Module, ModuleDTO> {
  constructor(@Inject('MODULES_REPOSITORY') readonly modules: typeof Module) {
    super(modules);
  }
  translateModules(data: Module[], lang: string = process.env.LANG_DEFAULT) {
    let modules = [];
    for (const module of data) {
      modules = [
        ...modules,
        {
          id: module.id,
          createdAt: module.createdAt,
          updatedAt: module.updatedAt,
          name: translate(module.name, lang),
          keyName: module.keyName,
          description: module.description,
          access: module.access.reduce((before, after) => {
            return (before = [
              ...before,
              {
                id: after.id,
                createdAt: after.createdAt,
                updatedAt: after.updatedAt,
                name: translate(after.name, lang),
                keyName: after.keyName,
                description: after.description,
                moduleId: after.moduleId,
              },
            ]);
          }, []),
        },
      ];
    }
    return modules;
  }
}
