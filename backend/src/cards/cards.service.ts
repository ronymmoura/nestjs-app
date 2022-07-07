import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CardPurchaseInstallment } from 'src/card-purchase-installments/entities/card-purchase-installments.entity';
import { UsersService } from 'src/users/users.service';
import { CardPurchase } from '../card-purchase/entities/card-purchase.entity';
import { CardDto } from './dto/card.dto';
import { Card, CardDocument } from './entities/card.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectModel(Card.name) private cardModel: Model<CardDocument>,
    private userService: UsersService,
  ) {}

  create(cardDto: CardDto) {
    this.createInstallments(cardDto);

    const user = new this.cardModel(cardDto);
    return user.save();
  }

  findAll() {
    return this.cardModel.find();
  }

  async find(userId: string) {
    const user = await this.userService.findOne(userId);
    return user.cards;
  }

  findOne(id: string) {
    return this.cardModel.findById(id);
  }

  update(id: string, cardDto: CardDto) {
    this.createInstallments(cardDto);

    return this.cardModel.findByIdAndUpdate(id, cardDto, {
      new: true,
    });
  }

  remove(id: string) {
    return this.cardModel.findByIdAndDelete(id);
  }

  createInstallments(cardDto: CardDto): CardDto {
    if (cardDto.purchases) {
      cardDto.purchases.forEach((purchase: CardPurchase) => {
        if (
          purchase.numberOfInstallments &&
          purchase.numberOfInstallments > 0
        ) {
          const installmentsList: CardPurchaseInstallment[] = [];

          for (let i = 0; i <= purchase.numberOfInstallments; i++) {
            const newInstallment: CardPurchaseInstallment = {
              installment: i,
              isPaid: i < purchase.paidInstallments,
            };

            installmentsList.push(newInstallment);
          }

          purchase.installments = installmentsList;
        }
      });
    }

    return cardDto;
  }
}
