import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { ConfigService } from '../../config/config.service';
import { generatePassword } from '../../config/constants';
import { SequelizeCrudService } from '../../crud/SequelizeCrudService';
import { User } from '../../entities/User.entity';
import { EmailsService } from '../../helpers/emails/emails.service';
import { UserDTO } from './user.dto';

/**
 * Injectable
 * UserService
 */
@Injectable()
export class UserService extends SequelizeCrudService<User, UserDTO> {
  constructor(
    @Inject('USERS_REPOSITORY') readonly users: typeof User,
    private readonly _emails: EmailsService,
    private readonly _config: ConfigService,
  ) {
    super(users);
  }
  /**
   * Gets by user
   * @param user
   * @returns by user
   */
  async getByUser(user: string): Promise<User> {
    // this.users.destroy
    return await this.users.findOne({
      where: {
        [Op.or]: [{ email: user }, { user: user }],
      },
    });
  }
  /**
   * Creates user service
   * @param user
   * @returns create
   */
  async create(user: Partial<UserDTO>): Promise<User> {
    let password = await generatePassword(8);
    let userName = user.user
      ? user.user
      : user.name.slice(0, 1).toLowerCase() + user.lastName.toLowerCase();
    let userString = userName;
    let itemCreated = await User.findOne({
      where: { user: userString },
      attributes: ['id'],
    });
    let num = 1;
    while (itemCreated) {
      let numString = String(num - 1);
      itemCreated = await User.findOne({
        where: {
          user: userString.replace(new RegExp(numString, 'g'), '') + num,
        },
        attributes: ['id'],
      });
      userString = userString.replace(new RegExp(numString, 'g'), '') + num;
      num++;
    }

    itemCreated = await this.users.create({
      ...user,
      password,
      user: userString.toLowerCase(),
      email: user.email.toLowerCase(),
    } as any);
    let item = await this.getOne(itemCreated.id, {
      attributes: [
        'id',
        'name',
        'lastName',
        'createdAt',
        'updatedAt',
        'companyId',
        'user',
        'email',
        'active',
      ],
    });
    try {
      await this._emails.sendMail(
        this._config.get('EMAIL_USER'),
        user.email,
        `Registro en la plataforma "nueva"`,
        'text',
        await this._emails.generateTemplate<any>('subscription', {
          password,
          userName: itemCreated.user,
        }),
      );
      return item;
    } catch (error) {
      console.log(error);

      throw new HttpException(
        'errors.users.user_not_created_email',
        HttpStatus.FAILED_DEPENDENCY,
      );
    }
  }
}
