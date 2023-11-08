import { AbstractRepository, Room } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RoomsRepository extends AbstractRepository<Room> {
  protected readonly logger = new Logger(RoomsRepository.name);

  constructor(@InjectModel(Room.name) private readonly roomModel: Model<Room>) {
    super(roomModel);
  }

  findWithPrice() {
    return this.roomModel.find({}).populate('priceId').lean();
  }
}
