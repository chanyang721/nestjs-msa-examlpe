import { IsNotEmpty, IsString } from "class-validator";



export class JwtPayLoadDto {
  @IsString()
  @IsNotEmpty()
  id: string
}
