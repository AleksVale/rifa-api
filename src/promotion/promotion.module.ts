import { Module } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { PromotionController } from './promotion.controller';
import { PromotionRepository } from './promotion.repository';

@Module({
  controllers: [PromotionController],
  providers: [PromotionService, PromotionRepository],
})
export class PromotionModule {}
