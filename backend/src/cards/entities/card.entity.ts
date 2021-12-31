import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { CardPurchase } from '../../card-purchase/entities/card-purchase.entity';

export type CardDocument = Card & Document;

@Schema()
export class Card {
  @Prop({ required: true })
  number: string;

  @Prop({ required: true })
  dueDate: Date;

  @Prop({ required: true })
  closingDay: number;

  @Prop()
  purchases: CardPurchase[];
}

export const CardSchema = SchemaFactory.createForClass(Card);
