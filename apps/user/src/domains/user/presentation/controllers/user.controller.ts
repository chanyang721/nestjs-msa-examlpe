import { Controller, Get } from '@nestjs/common';
import { UserService }     from '../../application/services/user.service';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getHello(): string {
    return this.userService.getHello();
  }
}
