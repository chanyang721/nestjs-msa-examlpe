import { Request }                                                     from "express";
import { ExtractJwt }                                                  from "passport-jwt";
import { ExecutionContext, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { AuthGuard }                                                   from "@nestjs/passport";
import { COOKIE_ACCESS_TOKEN_NAME, COOKIE_REFRESH_TOKEN_NAME }         from '@app/utils/constants'
import { JwtService }                                                  from '@app/jwt'
import { COOKIE_ACCESS_TOKEN_OPTIONS, COOKIE_REFRESH_TOKEN_OPTIONS }   from '@app/jwt/options'



@Injectable()
export class JwtAuthRefreshGuard extends AuthGuard("jwt-refresh-token") {
    private logger = new Logger(JwtAuthRefreshGuard.name);


    constructor( private readonly jwtService: JwtService ) {
        super();
    }


    async canActivate( context: ExecutionContext ): Promise<boolean> {
        const request = context.switchToHttp()
                               .getRequest();
        const response = context.switchToHttp()
                                .getResponse();

        try {
            const access_token = ExtractJwt.fromExtractors([ this.cookieAccessTokenExtractor ])(request);
            const expiredToken = await this.jwtService.isExpiredToken(access_token);
            if ( !expiredToken ) {
                throw new UnauthorizedException("Access token in the cookie is not expired");
            }

            else if ( expiredToken ) {
                const refresh_token = ExtractJwt.fromExtractors([ this.cookieRefreshTokenExtractor ])(request);
                const expiredToken = await this.jwtService.isExpiredToken(refresh_token);
                if ( expiredToken ) {
                    response.clearCookie(COOKIE_ACCESS_TOKEN_NAME, COOKIE_ACCESS_TOKEN_OPTIONS);
                    response.clearCookie(COOKIE_REFRESH_TOKEN_NAME, COOKIE_REFRESH_TOKEN_OPTIONS);
                    throw new UnauthorizedException("Refresh token in the cookie is expired");
                }
            }

            return this.activate(context);
        }
        catch ( e ) {
            throw new UnauthorizedException(e.message, e.status);
        }
    }


    async activate( context: ExecutionContext ): Promise<boolean> {
        return super.canActivate(context) as Promise<boolean>;
    }


    private cookieAccessTokenExtractor( request: Request ): string | null {
        let token = null;
        if ( request && request.cookies ) {
            token = request.cookies[ COOKIE_ACCESS_TOKEN_NAME ];
        }
        if ( !token ) {
            throw new UnauthorizedException("Access token is not set in cookie");
        }

        return token;
    };


    private cookieRefreshTokenExtractor( request: Request ): string | null {
        let token = null;
        if ( request && request.cookies ) {
            token = request.cookies[ COOKIE_REFRESH_TOKEN_NAME ];
        }
        if ( !token ) {
            throw new UnauthorizedException("Refresh token is not set in cookie");
        }

        return token;
    };


    handleRequest( err, user, info ) {
        if ( err || !user ) throw new UnauthorizedException();
        return user;
    }

}
