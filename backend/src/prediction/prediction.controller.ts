import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { PredictionService } from './prediction.service';

@Controller('prediction')
export class PredictionController {
  constructor(private readonly predictionService: PredictionService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  prediction(@Request() req) {
    return this.predictionService.prediction(req.user._id);
  }
}
