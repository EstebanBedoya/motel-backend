import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { PriceDocument, PriceSchema } from './price.schema';

@Schema({ versionKey: false })
export class RoomDocument extends AbstractDocument {
  @Prop({ unique: true })
  roomId: string;

  @Prop()
  name: string;

  @Prop({ enum: ['normal', 'special'] })
  type: string;

  @Prop({ enum: ['available', 'unavailable', 'cleaning', 'maintenance'] })
  state: string;

  @Prop({ type: [PriceSchema], _id: false })
  prices: PriceDocument[];
}

export const RoomSchema = SchemaFactory.createForClass(RoomDocument);
