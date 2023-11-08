import {
  ExecutionContext,
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { RecordsRepository } from './records.repository';
import { ROOMS_SERVICE, UserDto } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import * as dayjs from 'dayjs';

@Injectable()
export class RecordsService {
  constructor(
    @Inject(ROOMS_SERVICE) private readonly roomsClient: ClientProxy,
    private readonly recordsRepository: RecordsRepository,
  ) {}

  async create(
    createRecordDto: CreateRecordDto,
    { _id }: UserDto,
    jwt: string,
  ) {
    await this.validateRoom(createRecordDto.roomId, jwt);
    await this.validatePrice(createRecordDto.priceId, jwt);
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

  private async validateRoom(roomId: string, authentication: string) {
    try {
      await lastValueFrom(
        this.roomsClient.send('validate-room', {
          roomId,
          authentication,
        }),
      );
    } catch (error) {
      throw new UnprocessableEntityException('Room not found');
    }
  }

  private async validatePrice(priceId: string, authentication: string) {
    try {
      await lastValueFrom(
        this.roomsClient.send('validate-price', {
          priceId,
          authentication,
        }),
      );
    } catch (error) {
      throw new UnprocessableEntityException('Price not found');
    }
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
