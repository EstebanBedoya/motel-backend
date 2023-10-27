import { AbstractDocument } from '@app/common';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class Record extends AbstractDocument {
  @Prop({ required: true, ref: 'Room' })
  roomId: string;

  @Prop({ required: true, ref: 'User' })
  employee: string;

  @Prop()
  priceName: string;

  @Prop()
  checkIn: Date;

  @Prop()
  checkOut: Date;

  @Prop()
  typeService: string;

  @Prop()
  valueService: number;
}

export const RecordSchema = SchemaFactory.createForClass(Record);
