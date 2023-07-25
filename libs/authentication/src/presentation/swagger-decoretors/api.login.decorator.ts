import { ApiOperation, ApiResponse }   from "@nestjs/swagger";
import { applyDecorators, HttpStatus } from "@nestjs/common";
import { TokenDto }                    from "../dtos/token.dto";



export function ApiLoginDecorator() {
  return applyDecorators(
  ApiOperation({
    summary    : "로그인",
    description: `
                인증 서버의 uid로 등록된 유저를 서버 DB에서 조회
            `
  }),
  ApiResponse({
    status     : HttpStatus.OK,
    description: "로그인 성공",
    type       : TokenDto
  }));
}
