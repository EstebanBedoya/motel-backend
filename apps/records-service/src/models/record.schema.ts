import { AbstractDocument, Price, Room, User } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class Record extends AbstractDocument {
  @Prop({ required: true, ref: Room.name })
  roomId: string;

  @Prop({ required: true, ref: User.name })
  employee: string;

  @Prop({ required: true, ref: Price.name })
  priceId: string;

  @Prop()
  checkIn: Date;

  @Prop()
  checkOut: Date;

  @Prop()
  typeService: string;

  @Prop()
  value: number;
}

export const RecordSchema = SchemaFactory.createForClass(Record);
