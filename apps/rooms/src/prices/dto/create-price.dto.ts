import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreatePriceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  normal: number;

  @IsNumber()
  @IsNotEmpty()
  dawn: number;

  @IsNumber()
  @IsNotEmpty()
  extension: number;
}
