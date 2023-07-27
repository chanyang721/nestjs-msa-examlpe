import { Module }                   from '@nestjs/common';
import { JwtModule, JwtService }    from '@app/jwt'
import { AuthenticationController } from './presentation/controllers/authentication.controller';
import { AuthenticationService }    from './application/services/authentication.service';



@Module({
    imports    : [
        // JwtModule
    ],
    controllers: [ AuthenticationController ],
    providers  : [ AuthenticationService, JwtService ],
})
export class AuthenticationModule {
}
