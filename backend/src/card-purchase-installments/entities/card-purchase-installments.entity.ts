import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CardPurchaseInstallmentDocument = CardPurchaseInstallment &
  Document;

@Schema({ collection: 'card_purchase_installments' })
export class CardPurchaseInstallment {
  @Prop({ required: true })
  installment: number;

  @Prop()
  paymentDate?: Date;

  @Prop()
  receipt?: string;

  @Prop({ required: true, default: 0 })
  isPaid: boolean;
}

export const CardPurchaseInstallmentSchema = SchemaFactory.createForClass(
  CardPurchaseInstallment,
);
