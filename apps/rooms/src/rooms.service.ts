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
    await this.pricesService.validatePriceExist(createRoomDto.priceId);

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

  async validatePrice(priceId: string) {
    return this.pricesService.findOne(priceId);
  }
}
