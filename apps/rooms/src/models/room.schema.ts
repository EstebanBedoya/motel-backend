import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Price, PriceSchema } from './price.schema';

enum RoomType {
  NORMAL = 'normal',
  SPECIAL = 'special',
}

enum RoomState {
  AVAILABLE = 'available',
  OCCUPIED = 'occupied',
  CLEANING = 'cleaning',
  MAINTENANCE = 'maintenance',
}

@Schema({ versionKey: false })
export class Room extends AbstractDocument {
  @Prop({ unique: true })
  roomId: string;

  @Prop()
  name: string;

  @Prop({ enum: RoomType })
  type: string;

  @Prop({ enum: RoomState, default: RoomState.AVAILABLE })
  state: string;

  @Prop({ type: [PriceSchema], _id: false })
  prices: Price[];
}

export const RoomSchema = SchemaFactory.createForClass(Room);
