import { ApiProperty } from "@nestjs/swagger";
import { IsUUID }      from "class-validator";
import { Timestamps }  from "./timestamps.model";



export class BaseModelDto {
    @ApiProperty({
        type       : 'uuid',
        description: "base schema id",
        required   : true,
        example    : "806c85de-2534-4fc9-8b2f-980e4faab60f",
    }) @IsUUID() id: string;

    @ApiProperty({
        type       : Date,
        description: "base schema timestamps",
        required   : false,
        example    : {
            created_at: "2021-01-01T00:00:00.000Z",
            updated_at: "2021-01-01T00:00:00.000Z",
            deleted_at: "2021-01-01T00:00:00.000Z",
        },
    }) timestamps: Timestamps;

}
