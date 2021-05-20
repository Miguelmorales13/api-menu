import * as Joi from 'joi';
import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import { tryCatch } from "rxjs/internal-compatibility";
import { log } from "util";

/**
 * Env config
 */
export interface EnvConfig {
  [key: string]: string;
}

/**
 * Config service
 */
@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;

  /**
   * Creates an instance of config service.
   * @param filePath config default .env
   */
  constructor(filePath: string) {
    // console.log(filePath);

    try {
      // const config = dotenv.parse(fs.readFileSync(filePath));
      // this.envConfig = this.validateInput(config);
    } catch (e) {
      console.log(e);
    }
  }

  /**
   * Validates input
   * @param envConfig validadion
   * @returns input boolean
   */
  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string(),
      PORT: Joi.number().default(3000),
      TOKEN_SECRET: Joi.string().required(),
      HOST: Joi.string().required(),
      MONGO_CONNECTION: Joi.string().required(),
      HOST_COMPLETE: Joi.string().required(),
      SEQUELIZE_TYPE: Joi.string().required(),
      SEQUELIZE_HOST: Joi.string().required(),
      SEQUELIZE_PORT: Joi.number().required(),
      SEQUELIZE_USERNAME: Joi.string().required(),
      SEQUELIZE_PASSWORD: Joi.any().default(''),
      SEQUELIZE_DATABASE: Joi.string().required(),
      LANG_DEFAULT: Joi.string().required(),
      MULTER_DEST: Joi.string().default('/public'),
      HTTP_TIMEOUT: Joi.number().default(5000),
      HTTP_MAX_REDIRECTS: Joi.number().default(5),
      EMAIL_TEST: Joi.boolean().required(),
      EMAIL_HOST: Joi.string(),
      EMAIL_SERVICE: Joi.string(),
      EMAIL_PORT: Joi.number(),
      EMAIL_SEGURE: Joi.boolean(),
      EMAIL_USER: Joi.string(),
      EMAIL_PASSWORD: Joi.string(),
      LOGS_WRITE: Joi.boolean(),
      URL_LOGS: Joi.string().required()
    });

    const { error, value: validatedEnvConfig } = envVarsSchema.validate(envConfig);
    if (error) {
      console.log(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  /**
   * Gets config service
   * @param key config json
   * @returns get any config
   */
  get(key: string): any {
    return process.env[key];
  }
}
