import { Module } from '@nestjs/common';
import { PrizeService } from './prize.service';
import { PrizeController } from './prize.controller';

@Module({
  controllers: [PrizeController],
  providers: [PrizeService],
})
export class PrizeModule {}
