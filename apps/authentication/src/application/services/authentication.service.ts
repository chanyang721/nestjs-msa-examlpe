import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthenticationService {

  async getHello(): Promise<any> {
    return 'Hello World!';
  }
}
