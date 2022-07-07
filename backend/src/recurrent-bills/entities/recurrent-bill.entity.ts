import { Prop, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RecurrentBillDocument = RecurrentBill & Document;

@Schema({ collection: 'recurrent_bills' })
export class RecurrentBill {
  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  value: number;
}
