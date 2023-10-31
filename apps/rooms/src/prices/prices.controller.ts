import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PricesService } from './prices.service';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { JwtAuthGuard, Roles } from '@app/common';

@Controller('prices')
export class PricesController {
  constructor(private readonly pricesService: PricesService) {}

  @UseGuards(JwtAuthGuard)
  @Roles('Admin')
  @Post()
  create(@Body() createPriceDto: CreatePriceDto) {
    return this.pricesService.create(createPriceDto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('Admin')
  @Get()
  findAll() {
    return this.pricesService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Roles('Admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pricesService.remove(+id);
  }
}
