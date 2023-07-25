import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModuleAsyncOptions }       from "@nestjs/jwt";
import { Algorithm }                   from "jsonwebtoken";



export const jwtModuleAsyncOptions: JwtModuleAsyncOptions = {
  imports   : [ ConfigModule ],
  inject    : [ ConfigService ],
  useFactory: ( configService: ConfigService ) => {
    return {
      global       : true,
      secret       : configService.get<string>("JWT_SECRET"),
      signOptions  : {
        algorithm: configService.get<Algorithm>("JWT_ALGORITHM")
      },
      verifyOptions: {
        algorithms: [ configService.get<Algorithm>("JWT_ALGORITHM") ]
      }
    };
  }
};
