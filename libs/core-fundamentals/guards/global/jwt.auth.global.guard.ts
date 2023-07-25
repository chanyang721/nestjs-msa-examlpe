import { ExecutionContext, HttpException, HttpStatus, Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { AuthGuard }                                                                              from "@nestjs/passport";
import { Reflector }                                                                              from "@nestjs/core";
import { ExtractJwt }                                                                             from "passport-jwt";
import { IS_PUBLIC_KEY }                                                                          from '@app/utils/constants'



@Injectable()
export class JwtAuthGlobalGuard extends AuthGuard("jwt") {
    private logger = new Logger(JwtAuthGlobalGuard.name);


    constructor( private reflector: Reflector ) {
        super();
    }


    async canActivate( context: ExecutionContext ) {
        const request = context.switchToHttp()
                               .getRequest();

        const { isPublic } = await this.catchPublicRequest(context);
        if ( isPublic ) {
            return true;
        }

        const access_token = ExtractJwt.fromAuthHeaderAsBearerToken()(request);
        if ( !access_token ) {
            throw new UnauthorizedException("Access token is not set in header");
        }

        return this.activate(context);
    }


    async activate( context: ExecutionContext ): Promise<boolean> {
        return super.canActivate(context) as Promise<boolean>;
    }


    async catchPublicRequest( context: ExecutionContext ) {
        const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
            context.getHandler(), context.getClass(),
        ]);
        return { isPublic };
    }


    handleRequest( err, user, info: Error ) {
        if ( info?.name === "TokenExpiredError" ) {
            throw new HttpException("Token expired", HttpStatus.UNAUTHORIZED);
        }
        if ( err || !user ) {
            throw new HttpException("Unauthorized access", HttpStatus.UNAUTHORIZED);
        }

        return user;
    }

}

