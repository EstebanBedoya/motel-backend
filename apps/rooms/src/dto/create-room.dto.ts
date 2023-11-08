import { RoomState, RoomType } from '@app/common/types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateRoomDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  roomId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    enum: RoomType,
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(RoomType)
  type: string;

  @ApiProperty({
    enum: RoomState,
  })
  @IsString()
  @IsNotEmpty()
  @IsEnum(RoomState)
  state: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  priceId: string;
}
