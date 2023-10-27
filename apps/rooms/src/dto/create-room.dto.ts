import { ArrayMinSize, IsArray, IsNotEmpty, IsString } from "class-validator";
import { PriceDto } from "./price.dto";
import { Type } from "class-transformer";

export class CreateRoomDto {
  @IsString()
  @IsNotEmpty()
  roomId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  type: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsArray()
  @ArrayMinSize(1)
  @Type(() => PriceDto)
  prices: PriceDto[];
}
