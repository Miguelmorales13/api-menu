import { Sequelize } from 'sequelize-typescript';
import { AccessRolUser } from '../../entities/AccessesRolUser.entity';
import { ConfigService } from '../../config/config.service';
import { Rol } from '../../entities/Rol.entity';
import { User } from '../../entities/User.entity';
import { Module } from '../../entities/Module.entity';
import { Access } from '../../entities/Access.entity';
import { Category } from '../../entities/Category.entity';
import { Subcategory } from '../../entities/Subcategory.entity';
import { Product } from '../../entities/Product.entity';
import { ImageProduct } from '../../entities/ImagesProduct.entity';

/**
 * data base Provider
 */

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async (_config: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: _config.get('SEQUELIZE_TYPE'),
        host: _config.get('SEQUELIZE_HOST'),
        port: _config.get('SEQUELIZE_PORT'),
        username: _config.get('SEQUELIZE_USERNAME'),
        password: _config.get('SEQUELIZE_PASSWORD'),
        database: _config.get('SEQUELIZE_DATABASE'),
        ssl: true,
      });
      sequelize.addModels([
        Rol,
        Module,
        Access,
        AccessRolUser,
        User,
        Category,
        Subcategory,
        Product,
        ImageProduct,
      ]);
      await sequelize.sync();
      return sequelize;
    },
    inject: [ConfigService],
  },
];
