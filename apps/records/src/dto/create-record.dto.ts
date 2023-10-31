import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateRecordDto {
    @IsString()
    @IsNotEmpty()
    roomId: string;

    @IsString()
    @IsNotEmpty()
    priceName: string;

    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    checkIn: Date;

    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    checkOut: Date;

    @IsString()
    @IsNotEmpty()
    typeService: string;

    @IsNumber()
    @IsNotEmpty()
    value: number;
}
