import { IsNotEmpty, IsString } from "class-validator";



export class PayloadDto {
  @IsString()
  @IsNotEmpty()
  id: string
}
