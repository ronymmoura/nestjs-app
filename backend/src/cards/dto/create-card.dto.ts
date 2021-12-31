import { CardPurchase } from 'src/card-purchase/entities/card-purchase.entity';

export class CreateCardDto {
  number: string;
  dueDate: Date;
  closingDate: Date;
  purchases: CardPurchase[];
}
