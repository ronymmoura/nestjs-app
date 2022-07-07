import { InjectModel } from '@nestjs/mongoose';
import { parseISO } from 'date-fns';
import { Model } from 'mongoose';
import { CardPurchase } from 'src/card-purchase/entities/card-purchase.entity';
import { Card, CardDocument } from 'src/cards/entities/card.entity';
import { User, UserDocument } from 'src/users/entities/user.entity';
import { PredictionEntity } from './entities/prediction-entity';

export class PredictionService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Card.name) private cardModel: Model<CardDocument>,
  ) {}

  async prediction(id: string) {
    const card = await this.cardModel.findById(id).exec();

    const predictions: PredictionEntity[] = [];

    let date = new Date();

    for (let i = 0; i <= 12; i++) {
      date = new Date();
      date = new Date(date.getFullYear(), date.getMonth() + i, date.getDay());

      const purchases: CardPurchase[] = [];

      card.purchases.forEach((purchase) => {
        let paidInstallments = purchase.paidInstallments;
        const purchaseDate = parseISO(purchase.date.toString());

        if (purchase.numberOfInstallments > 0) {
          paidInstallments += i;

          purchase = {
            ...purchase,
            paidInstallments,
          };

          if (
            paidInstallments <= purchase.numberOfInstallments &&
            paidInstallments + i > 0
          )
            purchases.push(purchase);
        }

        if (
          !purchase.numberOfInstallments &&
          purchaseDate.getMonth() === date.getMonth() &&
          purchaseDate.getFullYear() === date.getFullYear()
        )
          purchases.push(purchase);
      });

      predictions.push({
        date,
        purchases,
      });
    }

    return predictions;
  }
}
