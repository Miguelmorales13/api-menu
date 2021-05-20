import { Injectable } from '@nestjs/common';
import { createTestAccount, createTransport, Transporter } from 'nodemailer';
import { join } from 'path';
import { renderFile } from 'pug';
import { ConfigService } from '../../config/config.service';

/**
 * Emails service
 */
@Injectable()
export class EmailsService {
  /**
   * Transporter  of emails service
   */
  private transporter: Transporter;

  /**
   * Creates an instance of emails service.
   * @param _config
   */
  constructor(private readonly _config: ConfigService) {
    let user: any = _config.get('EMAIL_TEST')
      ? createTestAccount()
      : {
          user: _config.get('EMAIL_USER'),
          pass: _config.get('EMAIL_PASSWORD'),
        };
    this.transporter = createTransport({
      host: _config.get('EMAIL_HOST'),
      port: _config.get('EMAIL_PORT'),
      secure: _config.get('EMAIL_SEGURE'), // true for 465, false for other ports
      auth: { ...user },
    });
  }

  /**
   * Sends mail
   * @param from
   * @param to
   * @param subject
   * @param text
   * @param html
   * @returns mail
   */
  async sendMail(
    from: string,
    to: string,
    subject: string,
    text: string,
    html: string,
  ): Promise<Transporter> {
    return await this.transporter.sendMail({ from, to, subject, text, html });
  }
  /**
   * Generates template
   * @template T
   * @param template
   * @param object
   * @returns template
   */
  async generateTemplate<T>(template: string, object: T): Promise<string> {
    if (this._config.get('NODE_ENV') == 'production') {
      return renderFile(
        join(
          __dirname,
          `../../../src/helpers/emails/templates/${template}.email.pug`,
        ),
        { ...object },
      );
    } else {
      return renderFile(join(__dirname, `/templates/${template}.email.pug`), {
        ...object,
      });
    }
  }
}
