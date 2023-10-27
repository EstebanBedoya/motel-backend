import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomsRepository } from './rooms.repository';

@Injectable()
export class RoomsService {
  constructor(private readonly roomsRepository: RoomsRepository) {}

  async create(createRoomDto: CreateRoomDto) {
    await this.validateCreateRoomDto(createRoomDto);

    return this.roomsRepository.create(createRoomDto);
  }

  async findAll() {
    return this.roomsRepository.findAll({});
  }

  async findOne(roomId: number) {
    return this.roomsRepository.findOne({ roomId });
  }

  async update(roomId: number, updateRoomDto: UpdateRoomDto) {
    return this.roomsRepository.findOneAndUpdate(
      { roomId },
      { $set: updateRoomDto },
    );
  }

  async remove(roomId: number) {
    return this.roomsRepository.findOneAndDelete({ roomId });
  }

  private async validateCreateRoomDto({ roomId }: CreateRoomDto) {
    try {
      await this.roomsRepository.findOne({ roomId });
    } catch (error) {
      return;
    }

    throw new UnprocessableEntityException('RoomId already exists.');
  }
}
