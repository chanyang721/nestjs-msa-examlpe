import { applyDecorators, HttpStatus }         from "@nestjs/common";
import { ApiOperation, ApiResponse, PickType } from "@nestjs/swagger";
import { TokenDto }                            from "../dtos/token.dto";



export function ApiRefreshDecorator() {
  return applyDecorators(
  ApiOperation({
    summary    : "엑세스 토큰 재발급",
    description: `
                엑세스 토큰 재발급
            `
  }),
  ApiResponse({
    status: HttpStatus.OK,
    type  : PickType(TokenDto, ["access_token"])
  }));
}
