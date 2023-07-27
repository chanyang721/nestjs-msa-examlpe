import { JwtModule as OriginJwtModule } from "@nestjs/jwt"
import { Module }                       from '@nestjs/common';
import { JwtService }                   from './jwt.service';



@Module({
    imports  : [ OriginJwtModule ],
    providers: [ JwtService ],
    exports  : [ JwtService ],
})
export class JwtModule {
}
