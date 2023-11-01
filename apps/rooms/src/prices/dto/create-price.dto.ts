import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePriceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  normal: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  dawn: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  extension: number;
}
