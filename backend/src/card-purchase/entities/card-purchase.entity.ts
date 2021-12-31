import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Card } from 'src/cards/entities/card.entity';

export type CardPurchaseDocument = CardPurchase & Document;

@Schema({ collection: 'card_purchases' })
export class CardPurchase {
  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  value: number;

  @Prop({ required: true, default: 0 })
  numberOfInstallments: number;

  @Prop({ required: true, default: 0 })
  paidInstallments: number;

  @Prop({ required: true, default: 0 })
  installmentValue: number;

  @Prop({ required: true, default: false })
  isPaid: boolean;
}

export const CardPurchaseSchema = SchemaFactory.createForClass(CardPurchase);
