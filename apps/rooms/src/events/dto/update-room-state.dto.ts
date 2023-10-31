import { IsNotEmpty, IsString } from "class-validator";

export class UpdateRoomStateDto {
    @IsString()
    @IsNotEmpty()
    roomId: string;

    @IsString()
    @IsNotEmpty()
    state: string;
}
