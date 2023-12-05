import { Module } from '@nestjs/common';
import { RaffleService } from './raffle.service';
import { RaffleController } from './raffle.controller';

@Module({
  controllers: [RaffleController],
  providers: [RaffleService],
})
export class RaffleModule {}
