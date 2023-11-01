import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRecordDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    roomId: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    priceName: string;

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
    typeService: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    value: number;
}
