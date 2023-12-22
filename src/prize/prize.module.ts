import { Module } from '@nestjs/common';
import { PrizeService } from './prize.service';
import { PrizeController } from './prize.controller';
import { PrizeRepository } from './prize.repository';

@Module({
  controllers: [PrizeController],
  providers: [PrizeService, PrizeRepository],
})
export class PrizeModule {}
