import {
  ExecutionContext,
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { RecordsRepository } from './records-service.repository';
import { ROOMS_SERVICE, UserDto } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import * as dayjs from 'dayjs';

@Injectable()
export class RecordsService {
  constructor(
    @Inject(ROOMS_SERVICE) private readonly roomsClient: ClientProxy,
    private readonly recordsRepository: RecordsRepository,
  ) {}

  async create(createRecordDto: CreateRecordDto, { _id }: UserDto) {
    this.validateDates(createRecordDto);

    return this.recordsRepository.create({
      ...createRecordDto,
      employee: _id,
    });
  }

  async findAll() {
    return this.recordsRepository.findAll({});
  }

  async update(_id: string, updateRecordDto: UpdateRecordDto) {
    return this.recordsRepository.findOneAndUpdate(
      { _id },
      { $set: updateRecordDto },
    );
  }

  async remove(_id: string) {
    return this.recordsRepository.findOneAndDelete({ _id });
  }

  private validateDates({ checkIn, checkOut }: CreateRecordDto) {
    if (dayjs(checkIn).isBefore(dayjs(checkOut))) {
      return;
    }

    throw new UnprocessableEntityException(
      'CheckIn date must be before CheckOut date',
    );
  }
}
