import { Injectable } from '@nestjs/common';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { RecordsRepository } from './records.repository';
import { UserDto } from '@app/common';

@Injectable()
export class RecordsService {
  constructor(private readonly recordsRepository: RecordsRepository) {}

  async create(createRecordDto: CreateRecordDto, { _id }: UserDto) {
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
}
