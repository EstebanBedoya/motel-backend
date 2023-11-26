import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { CreateRecordDto } from './dto/create-record.dto';
import { RecordDto } from './dto/record.dto';
import {
  CurrentUser,
  JwtAuthGuard,
  RECORDS_SERVICE,
  Roles,
  UserDto,
} from '@app/common';
import { UpdateRecordDto } from './dto/update-record.dto';
import { lastValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';

@Controller('records')
export class RecordsController {
  constructor(
    @Inject(RECORDS_SERVICE) private readonly recordClient: ClientProxy,
  ) {}

  @ApiOperation({
    summary: 'Create a new record',
  })
  @ApiBody({ type: CreateRecordDto })
  @ApiOkResponse({ type: RecordDto })
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body() createRecordDto: CreateRecordDto,
    @CurrentUser() user: UserDto,
  ) {
    return await lastValueFrom(
      this.recordClient.send('create-record', {
        createRecordDto,
        user,
      }),
    );
  }

  @ApiOperation({
    summary: 'Get all records',
  })
  @ApiOkResponse({ type: [RecordDto] })
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return lastValueFrom(this.recordClient.send('all-records', {}));
  }

  @ApiOperation({
    summary: 'Update a record',
  })
  @ApiOkResponse({ type: UpdateRecordDto })
  @ApiOkResponse({ type: RecordDto })
  @UseGuards(JwtAuthGuard)
  @Roles('Admin')
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRecordDto: UpdateRecordDto,
  ) {
    return lastValueFrom(
      this.recordClient.send('create-record', {
        id,
        updateRecordDto,
      }),
    );
  }

  @ApiOperation({
    summary: 'Delete a record',
  })
  @ApiOkResponse({ type: RecordDto })
  @UseGuards(JwtAuthGuard)
  @Roles('Admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return lastValueFrom(
      this.recordClient.send('create-record', {
        id,
      }),
    );
  }
}
