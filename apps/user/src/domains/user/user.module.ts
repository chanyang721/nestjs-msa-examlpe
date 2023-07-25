import { Module }              from '@nestjs/common';
import { ConfigurationModule } from '@app/configuration'
import { UserController }      from './presentation/controllers/user.controller';
import { UserService }         from './application/services/user.service';



@Module({
    imports    : [
        ConfigurationModule,
    ],
    controllers: [ UserController ],
    providers  : [ UserService ],
})
export class UserModule {
}
