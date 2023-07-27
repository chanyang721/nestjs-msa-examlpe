import { Controller, Get }       from '@nestjs/common';
import { AuthenticationService } from '../../application/services/authentication.service';

@Controller()
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @Get()
  async getHello(): Promise<any> {
    return await this.authenticationService.getHello();
  }
}
