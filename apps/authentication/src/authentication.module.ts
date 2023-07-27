import { Module }                   from '@nestjs/common';
import { JwtModule }                from '@app/jwt'
import { AuthenticationController } from './presentation/controllers/authentication.controller';
import { AuthenticationService }    from './application/services/authentication.service';



@Module({
    imports    : [
        JwtModule
    ],
    controllers: [ AuthenticationController ],
    providers  : [ AuthenticationService ],
})
export class AuthenticationModule {
}
