import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { RecurrentBill } from 'src/recurrent-bills/entities/recurrent-bill.entity';
import { Card } from 'src/cards/entities/card.entity';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  email: string;

  @Prop()
  name: string;

  @Prop()
  password: string;

  @Prop()
  recurrentBills: RecurrentBill[];

  @Prop()
  cards: Card[];

  //@Prop()
  //purchases: Purchase[];
}

export const UserSchema = SchemaFactory.createForClass(User);
