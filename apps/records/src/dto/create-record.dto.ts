import { RoomType, TypeService } from "@app/common/types";
import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRecordDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    roomId: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    priceId: string;

    @ApiProperty()
    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    checkIn: Date;

    @ApiProperty()
    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    checkOut: Date;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @IsEnum(TypeService)
    typeService: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    value: number;
}
