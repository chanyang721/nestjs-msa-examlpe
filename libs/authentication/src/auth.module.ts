import { Module }                 from "@nestjs/common";
import { PassportModule }         from "@nestjs/passport";
import { JwtModule }              from "@nestjs/jwt";
import { AuthController }         from "./presentation/controllers/auth.controller";
import { AuthService }            from "./application/services/auth.service";
import { FirebaseService }        from "./infrastructure/platforms/firebase/firebase.service";
import { AuthRepository }         from "./infrastructure/repositories/auth.repository";



@Module({
  imports    : [
    PassportModule,

    // JwtModule.registerAsync(jwtModuleAsyncOptions),

    // RepositoryModule.forFeature([ UserCommandRepository, AuthRepository ])
  ],
  controllers: [
    AuthController
  ],
  providers  : [


    AuthService, FirebaseService,

    // JwtService, HashingService,
    //
    // JwtAuthGlobalStrategy, LocalAuthStrategy, JwtAuthRefreshStrategy
  ]
})
export class AuthModule {
}
