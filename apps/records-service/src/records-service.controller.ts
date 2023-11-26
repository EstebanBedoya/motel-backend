import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { RecordsService } from './records-service.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { CurrentUser, JwtAuthGuard, Roles, UserDto } from '@app/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RecordDto } from './dto/record.dto';
import { Request } from 'express';
import { MessagePattern, Payload } from '@nestjs/microservices';

@ApiTags('Records')
@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @MessagePattern('create-record')
  create(
    @Payload()
    {
      createRecordDto,
      user,
    }: {
      createRecordDto: CreateRecordDto;
      user: UserDto;
    },
  ) {
    return this.recordsService.create(createRecordDto, user);
  }

  @MessagePattern('all-records')
  async findAll() {
    return this.recordsService.findAll();
  }

  @MessagePattern('update-record')
  async update({
    id,
    updateRecordDto,
  }: {
    id: string;
    updateRecordDto: UpdateRecordDto;
  }) {
    return this.recordsService.update(id, updateRecordDto);
  }

  @MessagePattern('delete-record')
  async remove(@Payload() { id }: { id: string }) {
    return this.recordsService.remove(id);
  }
}
