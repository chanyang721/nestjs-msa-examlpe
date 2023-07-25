import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { ConfigService }                                 from "@nestjs/config";
import { PassportStrategy }                              from "@nestjs/passport";
import { ExtractJwt, Strategy }                          from "passport-jwt";
import { COOKIE_REFRESH_TOKEN_NAME }                     from "@app/utils/constants";
import { AuthService }                                   from '@app/authentication/application/services/auth.service'
import { JwtService }                                    from '@app/authentication/jwt/jwt.service'



@Injectable()
export class JwtAuthRefreshStrategy extends PassportStrategy(Strategy, "jwt-refresh-token") {
    private readonly logger = new Logger(JwtAuthRefreshStrategy.name);


    constructor( private readonly configService: ConfigService, private readonly jwtService: JwtService,
        private readonly authService: AuthService,
    ) {
        super({
            jwtFromRequest   : ExtractJwt.fromExtractors([
                ( request ) => {
                    if ( !request?.cookies?.refresh_token ) {
                        throw new HttpException(`${COOKIE_REFRESH_TOKEN_NAME} 속성 정보가 cookie에 없습니다`, HttpStatus.BAD_REQUEST);
                    }
                    return request?.cookies?.refresh_token;
                },
            ]),
            secretOrKey      : configService.get("JWT_SECRET"),
            passReqToCallback: true,
        });
    }


    async validate( req: any, payload: any ): Promise<any> {
        const refresh_token = req.cookies?.refresh_token;
        if ( payload.sub !== COOKIE_REFRESH_TOKEN_NAME ) {
            throw new HttpException(`${COOKIE_REFRESH_TOKEN_NAME}으로 발급된 토큰이 아닙니다`, HttpStatus.BAD_REQUEST);
        }

        return await this.jwtService.validateToken(refresh_token);
    }
}
