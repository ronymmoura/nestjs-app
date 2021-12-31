import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { parseISO } from 'date-fns';
import { Model } from 'mongoose';
import { CardPurchase } from '../card-purchase/entities/card-purchase.entity';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card, CardDocument } from './entities/card.entity';
import { PredictionEntity } from './entities/prediction.entity';

@Injectable()
export class CardsService {
  constructor(@InjectModel(Card.name) private cardModel: Model<CardDocument>) {}

  create(createCardDto: CreateCardDto) {
    const user = new this.cardModel(createCardDto);
    return user.save();
  }

  findAll() {
    return this.cardModel.find();
  }

  findOne(id: string) {
    return this.cardModel.findById(id);
  }

  update(id: string, updateCardDto: UpdateCardDto) {
    return this.cardModel.findByIdAndUpdate(id, updateCardDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.cardModel.findByIdAndDelete(id);
  }

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
