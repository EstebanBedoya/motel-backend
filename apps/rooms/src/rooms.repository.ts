import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { Room } from './models/room.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RoomsRepository extends AbstractRepository<Room> {
  protected readonly logger = new Logger(RoomsRepository.name);

  constructor(
    @InjectModel(Room.name)
    roomModel: Model<Room>,
  ) {
    super(roomModel);
  }
}
