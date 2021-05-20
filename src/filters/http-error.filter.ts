import {
  ArgumentsHost,
  BadGatewayException,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Request, Response } from 'express';
import * as i18n from 'i18n';

import { LoggerService } from '../helpers/logger/logger.service';

/**
 * Catch HttpErrorFilter implements ExceptionFilter
 */
@Catch()
export class HttpErrorFilter implements ExceptionFilter {
  exceptions: any[] = [
    { instance: NotFoundException, where: 'NO_FOUND' },
    { instance: HttpException },
    { instance: BadGatewayException, where: 'URL' },
  ];

  /**
   * Catchs http error filter
   * @param exception Http exception
   * @param host argiment host
   */
  constructor(private readonly _logger: LoggerService) {}

  async catch(exception: HttpException, host: ArgumentsHost) {
    const { getRequest, getResponse }: HttpArgumentsHost = host.switchToHttp();
    const request = getRequest<Request>();
    const response = getResponse<Response>();
    // if (exception instanceof HttpException && exception.getStatus() == 404) {
    // 	return response.sendFile(join(__dirname, '../../public/client/index.html'));
    // }
    const lang: any =
      request.headers['accept-language'] || process.env.LANG_DEFAULT;

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    let messages: any = exception.message;
    // @ts-ignore
    if (exception.response) {
      // @ts-ignore
      messages = exception.response;
      // @ts-ignore
      if (exception.response.message) {
        // @ts-ignore
        messages = exception.response.message;
      }
    }
    if (exception.name == 'SequelizeValidationError') {
      // @ts-ignore
      messages = exception.errors.map((error) => error.message);
    }

    // @ts-ignore
    const wheree: any = exception.message && exception.message.where ? exception.message.where : 'SERVER';
    const errorResponse = {
      code: status,
      timestamps: new Date().toLocaleDateString(),
      path: request.url,
      method: request.method,
      message: await this.getMessage(messages, lang),
    };

    Logger.error(
      await this._logger.addLoggerInterceptor(
        request,
        Date.now(),
        wheree,
        'ERROR',
        errorResponse,
      ),
      exception.stack,
      wheree,
    );

    response.status(status).json(errorResponse);
  }

  async getMessage(error: any, lang: string) {
    if (error && error.error) {
      return await this.translateMessage(error.error, lang);
    } else if (error) {
      return await this.translateMessage(error, lang);
    } else {
      return null;
    }
  }

  async translateMessage(message: Array<string> | string, lang: string) {
    if (message instanceof Array) {
      return message
        .map((messageInArray) => {
          return i18n.__(
            {
              locale: lang,
              phrase: messageInArray,
            },
            messageInArray,
          );
        })
        .join(', ');
    } else {
      return i18n.__(
        {
          locale: lang,
          phrase: message.trim().trim(),
        },
        message,
      );
    }
  }
}
