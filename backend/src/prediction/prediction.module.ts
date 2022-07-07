import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Card, CardSchema } from 'src/cards/entities/card.entity';
import { User, UserSchema } from 'src/users/entities/user.entity';
import { PredictionEntity } from './entities/prediction-entity';
import { PredictionController } from './prediction.controller';
import { PredictionService } from './prediction.service';

@Module({
  imports: [
    PredictionEntity,
    MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [PredictionController],
  providers: [PredictionService],
})
export class PredictionModule {}
