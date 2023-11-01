import { ApiProperty } from '@nestjs/swagger';
import { CreatePriceDto } from './create-price.dto';

export class PriceDto extends CreatePriceDto {
    @ApiProperty()
    _id: string;
}
