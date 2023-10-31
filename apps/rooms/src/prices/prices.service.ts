import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreatePriceDto } from './dto/create-price.dto';
import { UpdatePriceDto } from './dto/update-price.dto';
import { PricesRepository } from './prices.repository';

@Injectable()
export class PricesService {
  constructor(private readonly pricesRepository: PricesRepository) {}

  async create(createPriceDto: CreatePriceDto) {
    await this.validateCreatePriceDto(createPriceDto);

    return this.pricesRepository.create(createPriceDto);
  }

  async findAll() {
    return this.pricesRepository.findAll({});
  }

  async findOne(_id: string) {
    return this.pricesRepository.findOne({ _id });
  }

  async remove(id: number) {
    return this.pricesRepository.findOneAndDelete({ id });
  }

  private async validateCreatePriceDto({ name }: CreatePriceDto) {
    try {
      await this.pricesRepository.findOne({ name });
    } catch (error) {
      return;
    }

    throw new UnprocessableEntityException('Price name already exists.');
  }
}
