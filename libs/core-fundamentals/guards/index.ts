import { CanActivate }        from "@nestjs/common";
import { Reflector }          from "@nestjs/core";
import { JwtAuthGlobalGuard } from "./global/jwt.auth.global.guard";

const reflector = new Reflector();

export const globalGuards: CanActivate[] = [
  new JwtAuthGlobalGuard(reflector)
]