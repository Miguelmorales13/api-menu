import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class ValidatorPipe implements PipeTransform<any> {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (value instanceof Object && this.isEmpty(value)) {
      throw new HttpException(
        'validations.general.empty_request',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new HttpException(this.formatError(errors), HttpStatus.BAD_REQUEST);
    }
    return value;
  }

  private toValidate(metatype: Function): boolean {
    const types: Function[] = [String, Boolean, Number, Array, Object];

    return !types.includes(metatype);
  }
  private formatError(errors: any[]) {
    Logger.log(JSON.stringify(errors[0].constraints));
    return errors.map((e) => {
      for (const key in e.constraints) {
        return `validations.${e.constraints[key]}`;
      }
    });
    // .join(', ');
  }
  private isEmpty(value: any) {
    return Object.keys(value).length > 0 ? false : true;
  }
}
