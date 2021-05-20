import { Injectable } from '@nestjs/common';

@Injectable()
export class InternalizationService {
  getHello(): string {
    return 'Hello World!';
  }
}
