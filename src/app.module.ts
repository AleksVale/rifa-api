import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RaffleModule } from './raffle/raffle.module';

@Module({
  imports: [RaffleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
