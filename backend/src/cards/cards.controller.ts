import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardDto } from './dto/card.dto';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @Post()
  create(@Body() cardDto: CardDto) {
    return this.cardsService.create(cardDto);
  }

  @Get()
  find(@Request() req) {
    const userId = req.user._id;
    return this.cardsService.find(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cardsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() cardDto: CardDto) {
    return this.cardsService.update(id, cardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardsService.remove(id);
  }
}
