import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { JwtAuthGuard, Roles } from '@app/common';
import { ApiBody, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { RoomDto } from './dto/room.dto';

@ApiTags('Rooms')
@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @ApiOperation({
    summary: 'Create a new room',
  })
  @ApiBody({ type: CreateRoomDto })
  @ApiOkResponse({ type: CreateRoomDto })
  @UseGuards(JwtAuthGuard)
  @Roles('Admin')
  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @ApiOperation({
    summary: 'Get all rooms',
  })
  @ApiBody({ type: CreateRoomDto })
  @ApiOkResponse({ type: RoomDto })
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.roomsService.findAll();
  }

  @ApiOperation({
    summary: 'Get room by id',
  })
  @ApiOkResponse({ type: RoomDto })
  @UseGuards(JwtAuthGuard)
  @Get(':roomId')
  findOne(@Param('roomId') roomId: string) {
    return this.roomsService.findOne(+roomId);
  }

  @ApiOperation({
    summary: 'Update room',
  })
  @ApiBody({ type: UpdateRoomDto })
  @ApiOkResponse({ type: RoomDto })
  @UseGuards(JwtAuthGuard)
  @Roles('Admin')
  @Patch(':roomId')
  update(
    @Param('roomId') roomId: string,
    @Body() updateRoomDto: UpdateRoomDto,
  ) {
    return this.roomsService.update(+roomId, updateRoomDto);
  }

  @ApiOperation({
    summary: 'Delete room',
  })
  @ApiOkResponse({ type: RoomDto })
  @UseGuards(JwtAuthGuard)
  @Roles('Admin')
  @Delete(':roomId')
  remove(@Param('roomId') roomId: string) {
    return this.roomsService.remove(+roomId);
  }
}
