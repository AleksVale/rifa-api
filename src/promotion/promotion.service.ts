// promotion.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PromotionRepository } from './promotion.repository';
import { CreatePromotionDto } from './dto/create-promotion.dto';

@Injectable()
export class PromotionService {
  constructor(private promotionRepository: PromotionRepository) {}

  async upsertAll(promotions: CreatePromotionDto[]) {
    await this.promotionRepository.deleteAll(promotions[0].raffleId);
    const upsertPromises = promotions.map(async (promotion) => {
      return this.promotionRepository.create(promotion);
    });

    return Promise.all(upsertPromises);
  }

  async findAll() {
    return this.promotionRepository.findAll();
  }

  async findOne(id: number) {
    const promotion = await this.promotionRepository.findOne(id);
    if (!promotion) {
      throw new NotFoundException(`Promotion with ID ${id} not found`);
    }
    return promotion;
  }

  async remove(id: number) {
    await this.promotionRepository.findOne(id);
    return this.promotionRepository.remove(id);
  }
}
