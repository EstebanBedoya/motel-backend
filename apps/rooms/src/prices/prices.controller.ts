import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PricesService } from './prices.service';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { JwtAuthGuard, Roles } from '@app/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PriceDto } from './dto/price.dto';

@ApiTags('Prices')
@Controller('prices')
export class PricesController {
  constructor(private readonly pricesService: PricesService) {}

  @ApiOperation({
    summary: 'Create a new price',
  })
  @ApiBody({ type: CreatePriceDto })
  @ApiOkResponse({ type: PriceDto })
  @UseGuards(JwtAuthGuard)
  @Roles('Admin')
  @Post()
  create(@Body() createPriceDto: CreatePriceDto) {
    return this.pricesService.create(createPriceDto);
  }

  @ApiOperation({
    summary: 'Get all prices',
  })
  @ApiOkResponse({ type: PriceDto })
  @UseGuards(JwtAuthGuard)
  @Roles('Admin')
  @Get()
  findAll() {
    return this.pricesService.findAll();
  }

  @ApiOperation({
    summary: 'Delete price',
  })
  @ApiOkResponse({ type: PriceDto })
  @UseGuards(JwtAuthGuard)
  @Roles('Admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pricesService.remove(+id);
  }
}
