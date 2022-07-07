import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { Card, CardSchema } from './entities/card.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from 'src/users/users.service';
import { User, UserSchema } from 'src/users/entities/user.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Card.name, schema: CardSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UsersService,
  ],
  controllers: [CardsController],
  providers: [CardsService],
})
export class CardsModule {}
