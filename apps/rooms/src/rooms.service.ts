import {
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomsRepository } from './rooms.repository';
import { PricesService } from './prices/prices.service';

@Injectable()
export class RoomsService {
  constructor(
    private readonly roomsRepository: RoomsRepository,
    @Inject(PricesService) private readonly pricesService: PricesService,
  ) {}

  async create(createRoomDto: CreateRoomDto) {
    await this.validateCreateRoomDto(createRoomDto);
    await this.validatePriceExist(createRoomDto);

    return this.roomsRepository.create(createRoomDto);
  }

  async findAll() {
    return this.roomsRepository.findWithPrice();
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

  private async validatePriceExist({ price }: CreateRoomDto) {
    try {
      await this.pricesService.findOne(price);
    } catch (error) {
      throw new UnprocessableEntityException('PriceId does not exist.');
    }
  }
}
