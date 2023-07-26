import { Module }                   from '@nestjs/common';
import { AuthenticationController } from './presentation/controllers/authentication.controller';
import { AuthenticationService }    from './application/services/authentication.service';

@Module({
  imports: [],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AuthenticationModule {}
