import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PassportStrategy }                      from "@nestjs/passport";
import { Strategy }                              from "passport-local";



@Injectable()
export class LocalAuthStrategy extends PassportStrategy(Strategy) {
    // private readonly cognitoClient: any;

    constructor(
        // private readonly cognitoService: CognitoService
    ) {
        super({
            usernameField: "uid", // passwordField: "id_token",
        });
        // this.cognitoClient = cognitoService.getFirebaseClient();
    }


    async validate( uid: string, id_token: string ): Promise<any> {
        try {
            // const decodedFirebaseToken = this.firebaseClient.auth()
            //                                  .verifyIdToken(id_token);

            // if ( decodedFirebaseToken.uid !== uid ) {
            //     throw new UnauthorizedException("firebase uid is not matched with user uid in db");
            // }

            return {
                uid, // ...decodedFirebaseToken,
            };
        }
        catch ( e ) {
            if ( e.code === "auth/argument-error" ) {
                throw new HttpException("firebase id token is expired", HttpStatus.UNAUTHORIZED);
            }
            throw new HttpException("firebase id token is invalid", HttpStatus.UNAUTHORIZED);
        }
    }
}

