import { AbstractRepository } from '@app/common';
import { Injectable, Logger } from '@nestjs/common';
import { RoomDocument } from './models/room.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RoomsRepository extends AbstractRepository<RoomDocument> {
  protected readonly logger = new Logger(RoomsRepository.name);

  constructor(
    @InjectModel(RoomDocument.name)
    roomModel: Model<RoomDocument>,
  ) {
    super(roomModel);
  }
}
