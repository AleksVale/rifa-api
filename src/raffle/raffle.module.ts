import { Module } from '@nestjs/common';
import { RaffleService } from './raffle.service';
import { RaffleController } from './raffle.controller';
import { PrismaService } from 'src/prisma.service';
import { RaffleRepository } from './raffle.repository';

@Module({
  controllers: [RaffleController],
  providers: [RaffleService, PrismaService, RaffleRepository],
})
export class RaffleModule {}
