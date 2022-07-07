//require('dotenv/config');
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CardsModule } from './cards/cards.module';
import { AuthModule } from './auth/auth.module';
import { PredictionModule } from './prediction/prediction.module';

console.log(process.env.MONGODB_CONNECTION);

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_CONNECTION || 'mongodb://localhost/nest',
    ),
    AuthModule,
    UsersModule,
    CardsModule,
    PredictionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
