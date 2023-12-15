// prize.repository.ts
import { PrismaService } from 'src/prisma.service';
import { CreatePrizeDto } from './dto/create-prize.dto';
import { UpdatePrizeDto } from './dto/update-prize.dto';

export class PrizeRepository {
  constructor(private prisma: PrismaService) {}

  async create(createPrizeDto: CreatePrizeDto) {
    return this.prisma.prize.create({
      data: {
        name: createPrizeDto.name,
        place: createPrizeDto.place,
        raffleId: createPrizeDto.raffleID,
      },
    });
  }

  async findAll() {
    return this.prisma.prize.findMany();
  }

  async findOne(id: number) {
    return this.prisma.prize.findUnique({ where: { id } });
  }

  async remove(id: number) {
    return this.prisma.prize.delete({ where: { id } });
  }

  update(id: number, updatePrizeDto: UpdatePrizeDto) {
    return this.prisma.prize.update({
      where: { id },
      data: updatePrizeDto,
    });
  }

  deleteAll(raffleId: number) {
    return this.prisma.prize.deleteMany({ where: { raffleId } });
  }
}
