require('dotenv/config');
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';

console.log(process.env.MONGODB_CONNECTION);

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_CONNECTION),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
