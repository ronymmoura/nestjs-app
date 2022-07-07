import { CardPurchase } from 'src/card-purchase/entities/card-purchase.entity';

export class PredictionEntity {
  date: Date;
  purchases: CardPurchase[];
}
