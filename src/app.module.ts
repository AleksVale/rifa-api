import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RaffleModule } from './raffle/raffle.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PromotionModule } from './promotion/promotion.module';
import { PrizeModule } from './prize/prize.module';
import { WinnerModule } from './winner/winner.module';
import { TicketModule } from './ticket/ticket.module';
import { ConfigModule } from '@nestjs/config';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    RaffleModule,
    AuthModule,
    UsersModule,
    PromotionModule,
    PrizeModule,
    WinnerModule,
    TicketModule,
    ConfigModule.forRoot(),
    TransactionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
