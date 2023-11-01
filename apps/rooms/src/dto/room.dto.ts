import { ApiProperty, OmitType } from "@nestjs/swagger";
import { CreatePriceDto } from "../prices/dto/create-price.dto";
import { CreateRoomDto } from "./create-room.dto";

export class RoomDto extends OmitType(CreateRoomDto, ['price'] as const) {
    @ApiProperty()
    price: CreatePriceDto
}