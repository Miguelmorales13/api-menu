import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as moment from 'moment';
import * as path from 'path';
import { ConfigService } from '../../config/config.service';
import { GateLoggerGateway } from './gate-logger.gateway';

@Injectable()
export class LoggerService {
  constructor(
    private readonly _config: ConfigService,
    private readonly _gateLog: GateLoggerGateway,
  ) {}

  // async getLogs() {
  // 	return await this.repLog.findAll({ limit: 1000 });
  // }

  addLoggerInterceptor(
    { method, url, uuid }: any,
    now: number,
    wheree: string,
    type: TypeLogger,
    result: object,
  ): string {
    let logger = `[${moment().format(
      'DD-MM-YYYY HH:MM:SS',
    )}] [uuid:${uuid}] [${wheree}] [${method} ${url} ${
      Date.now() - now
    }ms] [${type}::${JSON.stringify(result)}]`;
    if (this._config.get('LOGS_WRITE')) {
      this.writeLogger(logger);
    }
    this._gateLog.sendLog(logger);
    return logger;
  }
  writeLogger(logger: string) {
    const date = moment().format('DD-MM-YYYY');
    const url = path.join(
      __dirname,
      '../../../',
      this._config.get('URL_LOGS'),
      `${date}-logging.log`,
    );
    fs.appendFile(url, logger + '\n', (error) => {
      if (error) {
        return false;
      }
      return true;
    });
  }
}
export type TypeLogger = 'REQUEST' | 'RESPONSE' | 'ERROR' | 'SERVICE';
