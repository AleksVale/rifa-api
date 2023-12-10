// promotion.repository.ts
import { PrismaService } from 'src/prisma.service';
import { CreatePromotionDto } from './dto/create-promotion.dto';

export class PromotionRepository {
  constructor(private prisma: PrismaService) {}

  async findOneByQuantity(quantity: number, raffleId: number) {
    return this.prisma.promotion.findFirst({ where: { quantity, raffleId } });
  }

  async create(createPromotionDto: CreatePromotionDto) {
    return this.prisma.promotion.create({ data: createPromotionDto });
  }

  async findAll() {
    return this.prisma.promotion.findMany();
  }

  async findOne(id: number) {
    return this.prisma.promotion.findUnique({ where: { id } });
  }

  async remove(id: number) {
    return this.prisma.promotion.delete({ where: { id } });
  }

  update(id: number, updatePromotionDto: CreatePromotionDto) {
    return this.prisma.promotion.update({
      where: { id },
      data: updatePromotionDto,
    });
  }

  deleteAll(raffleId: number) {
    return this.prisma.promotion.deleteMany({ where: { raffleId } });
  }
}
