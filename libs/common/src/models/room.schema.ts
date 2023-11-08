import { AbstractDocument } from '@app/common';
import { Price } from './price.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { RoomState, RoomType } from '../types';

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

  @Prop({ required: true, ref: Price.name })
  priceId: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
