import type { Response }                                                                                                  from "express";
import { Body, Controller, Get, Post, Req, Res, UseGuards }                                                               from "@nestjs/common";
import { ApiTags }                                                                                                        from "@nestjs/swagger";
import { COOKIE_ACCESS_TOKEN_NAME, COOKIE_ACCESS_TOKEN_OPTIONS, COOKIE_REFRESH_TOKEN_NAME, COOKIE_REFRESH_TOKEN_OPTIONS } from "../../../utils/constants";
import { Public }                                                                                                         from "../../../utils/decoretors";
import { LocalAuthGuard }                                                                                                 from "../../../core-fundamentals/guards/local/local.auth.guard";
import { JwtAuthRefreshGuard }                                                                                            from "../../../core-fundamentals/guards/local/jwt.refresh.guard";
import { RegisterUserDto }                                                                                                from "../dtos/auth.register.user.dto";
import { LoginDto }                                                                                                       from "../dtos/login.dto";
import { TokenDto }                                                                                                       from "../dtos/token.dto";
import { ApiRegisterDecorator }                                                                                           from "../swagger-decoretors/api.register.decorator";
import { ApiLoginDecorator }                                                                                              from "../swagger-decoretors/api.login.decorator";
import { ApiRefreshDecorator }                                                                                            from "../swagger-decoretors/api.refresh.decorator";
import { IAuthController }                                                                                                from "../interfaces/auth.controller.interface";
import { AuthService }                                                                                                    from "../../application/services/auth.service";



@Public()
@ApiTags("auth")
@Controller("auth")
export class AuthController implements IAuthController {
  constructor( private readonly authService: AuthService ) {
  }


  /**
   * @description: [ POST ] register user
   * @param registerUserDto RegisterUserDto
   * @return any
   */
  @Post("register")
  @ApiRegisterDecorator()
  @UseGuards(LocalAuthGuard)
  async register(
    @Body() registerUserDto: RegisterUserDto
  ): Promise<any> {
    return await this.authService.register(registerUserDto);
  }


  /**
   * @description [ POST ] Auth Login API
   * @param loginDto LoginDto
   * @param res Request with user
   * @returns TokenDto
   * */
  @Post("login")
  @ApiLoginDecorator()
  async login(
    @Body() loginDto: LoginDto,
    @Res({ passthrough: true }) res: Response
  ): Promise<TokenDto> {
    const tokens: TokenDto = await this.authService.login(loginDto);

    res.cookie(COOKIE_ACCESS_TOKEN_NAME, tokens.access_token, COOKIE_ACCESS_TOKEN_OPTIONS);
    res.cookie(COOKIE_REFRESH_TOKEN_NAME, tokens.refresh_token, COOKIE_REFRESH_TOKEN_OPTIONS);

    return tokens;
  }


  /**
   * @description [ GET ] Auth Refresh API
   * @param req Request with user
   * @returns TokenDto
   */
  @Get("refresh")
  @ApiRefreshDecorator()
  @UseGuards(JwtAuthRefreshGuard)
  async refresh(
    @Req() req: any
  ): Promise<Pick<TokenDto, "access_token">> {
    return await this.authService.refreshAccessToken(req.user, req.cookie.refresh_token);
  }
}
