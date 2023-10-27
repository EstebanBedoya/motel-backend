import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { Record } from './models/record.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RecordsRepository extends AbstractRepository<Record> {
  protected readonly logger = new Logger(RecordsRepository.name);

  constructor(
    @InjectModel(Record.name)
    recordModel: Model<Record>,
  ) {
    super(recordModel);
  }
}