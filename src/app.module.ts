import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RaffleModule } from './raffle/raffle.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PromotionModule } from './promotion/promotion.module';

@Module({
  imports: [RaffleModule, AuthModule, UsersModule, PromotionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
