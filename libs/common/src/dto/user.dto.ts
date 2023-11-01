import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsEmail, IsNotEmpty, IsOptional, IsString, IsStrongPassword } from "class-validator";

export class UserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  _id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsStrongPassword()
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty({ each: true })
  roles?: string[];
}
