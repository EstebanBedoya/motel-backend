import { AbstractRepository, Price } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PricesRepository extends AbstractRepository<Price> {
  protected readonly logger = new Logger(PricesRepository.name);

  constructor(
    @InjectModel(Price.name)
    PriceModel: Model<Price>,
  ) {
    super(PriceModel);
  }
}
