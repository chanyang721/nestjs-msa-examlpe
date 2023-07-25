import { ApiProperty } from "@nestjs/swagger";
import { IsString }    from "class-validator";



export class TokenDto {
  @ApiProperty({
    type       : String,
    description: "access token",
    required   : true,
    example    : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgwNmM4NWRlLTI1MzQtNGZjOS04YjJmLTk4MGU0ZmFhYjYwZiIsInVpZCI6InhvcUdUUjk4NzFOYnprZDQzYWJzRXI1QVpWcDIiLCJpYXQiOjE2NzMzMjY3MDgsImV4cCI6MTY3NTkxODcwOH0.qCkI3sN5T-ExUqPJ2VC6bQcbC-6g94"
  })
  @IsString()
  access_token: string;

  @ApiProperty({
    type       : String,
    description: "refresh token",
    required   : true,
    example    : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgwNmM4NWRlLTI1MzQtNGZjOS04YjJmLTk4MGU0ZmFhYjYwZiIsInVpZCI6InhvcUdUUjk4NzFOYnprZDQzYWJzRXI1QVpWcDIiLCJpYXQiOjE2NzMzMjY3MDgsImV4cCI6MTY3NTkxODcwOH0.qCkI3sN5T-ExUqPJ2VC6bQcbC-6g94"
  })
  @IsString()
  refresh_token: string;
}
