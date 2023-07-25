import type { Request, Response } from "express";
import { RegisterUserDto }        from "../dtos/auth.register.user.dto";
import { LoginDto }               from "../dtos/login.dto";
import { TokenDto }               from "../dtos/token.dto";



export interface IAuthController {
  register( registerUserDto: RegisterUserDto ): Promise<any>;

  login( loginDto: LoginDto, res: Response ): Promise<TokenDto>;

  refresh( req: Request ): Promise<Pick<TokenDto, "access_token">>;
}
