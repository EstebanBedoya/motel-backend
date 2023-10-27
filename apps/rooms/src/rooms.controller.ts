import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { JwtAuthGuard, Roles } from '@app/common';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @UseGuards(JwtAuthGuard)
  @Roles('Admin')
  @Post()
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomsService.create(createRoomDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.roomsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':roomId')
  findOne(@Param('roomId') roomId: string) {
    return this.roomsService.findOne(+roomId);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('Admin')
  @Patch(':roomId')
  update(@Param('roomId') roomId: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomsService.update(+roomId, updateRoomDto);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('Admin')
  @Delete(':roomId')
  remove(@Param('roomId') roomId: string) {
    return this.roomsService.remove(+roomId);
  }
}
