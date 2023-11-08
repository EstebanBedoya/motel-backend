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
import { RecordsService } from './records.service';
import { CreateRecordDto } from './dto/create-record.dto';
import { UpdateRecordDto } from './dto/update-record.dto';
import { CurrentUser, JwtAuthGuard, Roles, UserDto } from '@app/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RecordDto } from './dto/record.dto';
import { Request } from 'express';

@ApiTags('Records')
@Controller('records')
export class RecordsController {
  constructor(private readonly recordsService: RecordsService) {}

  @ApiOperation({
    summary: 'Create a new record',
  })
  @ApiBody({ type: CreateRecordDto })
  @ApiOkResponse({ type: RecordDto })
  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body() createRecordDto: CreateRecordDto,
    @CurrentUser() user: UserDto,
    @Req() request: Request,
  ) {
    const jwt = request.cookies?.Authentication;
    return this.recordsService.create(createRecordDto, user, jwt);
  }

  @ApiOperation({
    summary: 'Get all records',
  })
  @ApiOkResponse({ type: [RecordDto] })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.recordsService.findAll();
  }

  @ApiOperation({
    summary: 'Update a record',
  })
  @ApiOkResponse({ type: UpdateRecordDto })
  @ApiOkResponse({ type: RecordDto })
  @UseGuards(JwtAuthGuard)
  @Roles('Admin')
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRecordDto: UpdateRecordDto) {
    return this.recordsService.update(id, updateRecordDto);
  }

  @ApiOperation({
    summary: 'Update a record',
  })
  @ApiOkResponse({ type: RecordDto })
  @UseGuards(JwtAuthGuard)
  @Roles('Admin')
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.recordsService.remove(id);
  }
}
