import { Injectable }                                          from "@nestjs/common";
import { JwtService as OriginJwtService, JwtSignOptions }      from "@nestjs/jwt";
import { COOKIE_ACCESS_TOKEN_NAME, COOKIE_REFRESH_TOKEN_NAME } from "../constants";
import { CommonConfigService }                                 from "../../configuration/common.config.service";
import { TokenDto }                                            from "../../authentication/presentation/dtos/token.dto";
import { JwtPayLoadDto }       from "./interface/jwt.payload.interface";



@Injectable()
export class JwtService {
  private readonly jwtConfig = this.commonConfigService.JwtConfig;


  constructor(
    private readonly originJwtService: OriginJwtService,
    private readonly commonConfigService: CommonConfigService,
  ) {
  }


  async refreshAccessToken( user: any ) {
    const { access_token } = await this.getTokens(user.id);
    return { access_token };
  }


  private async generateToken( payload: JwtPayLoadDto, options: JwtSignOptions ) {
    return this.originJwtService.sign(payload, options);
  }


  public async validateToken( token: string ): Promise<any> {
    return this.originJwtService.verify(token);
  }


  public async getTokens( payloadSource: any, subject?: string ): Promise<TokenDto> {
    const tokens = new TokenDto();
    const payload: JwtPayLoadDto = await this.generatePayload(payloadSource);

    tokens.access_token = await this.generateToken(payload, {
      expiresIn: this.jwtConfig.accessTokenExpiresIn,
      subject  : COOKIE_ACCESS_TOKEN_NAME
    });

    tokens.refresh_token = await this.generateToken(payload, {
      expiresIn: this.jwtConfig.refreshTokenExpiresIn,
      subject  : COOKIE_REFRESH_TOKEN_NAME
    });

    return tokens;
  }

  private async generatePayload( payload: any ): Promise<JwtPayLoadDto> {
    // const [ id ] = await Promise.all([
    //   this.hashingService.hashingTarget(payload.id)
    // ])

    return {
      id: payload.id
    }
  }

  /**
   * 에러: true
   * !에러: false
   */
  async isExpiredToken( token: string ): Promise<null | boolean> {
    try {
      await this.validateToken(token);
      return false;
    }
    catch ( e ) {
      return e.name === "TokenExpiredError";
    }
  }
}
