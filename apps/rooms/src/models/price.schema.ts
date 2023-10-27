import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ versionKey: false })
export class Price {
  @Prop()
  name: string;

  @Prop()
  normal: number;

  @Prop()
  dawn: number;

  @Prop()
  extension: number;
}

export const PriceSchema = SchemaFactory.createForClass(Price);
