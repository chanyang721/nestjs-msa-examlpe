import { PickType }      from "@nestjs/swagger";
import { AuthEntityDto } from "./auth.entity.dto";



export class LoginDto extends PickType(AuthEntityDto, [ "uid", "platform" ]) {
}
