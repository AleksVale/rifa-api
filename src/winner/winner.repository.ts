// winner.repository.ts
import { PrismaService } from 'src/prisma.service';
import { CreateWinnerDto } from './dto/create-winner.dto';
import { UpdateWinnerDto } from './dto/update-winner.dto';

export class WinnerRepository {
  constructor(private prisma: PrismaService) {}

  async create(createWinnerDto: CreateWinnerDto) {
    return this.prisma.winner.create({
      data: createWinnerDto,
    });
  }

  async findAll() {
    return this.prisma.winner.findMany();
  }

  async findOne(id: number) {
    return this.prisma.winner.findUnique({ where: { id } });
  }

  async remove(id: number) {
    return this.prisma.winner.delete({ where: { id } });
  }

  update(id: number, updateWinnerDto: UpdateWinnerDto) {
    return this.prisma.winner.update({
      where: { id },
      data: updateWinnerDto,
    });
  }

  deleteAll(raffleId: number) {
    return this.prisma.winner.deleteMany({ where: { raffleId } });
  }
}
