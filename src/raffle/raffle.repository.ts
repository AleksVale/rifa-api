// raffle.repository.ts
import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { Raffle, Prisma } from '@prisma/client';
import { UpdateRaffleDto } from './dto/update-raffle.dto';

@Injectable()
export class RaffleRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: Prisma.RaffleCreateInput): Promise<Raffle> {
    return this.prisma.raffle.create({
      data: {
        ...data,
        description: '',
        maxTickets: data.ticketLimit,
        minTickets: 1,
        showRanking: false,
      },
    });
  }

  async findAll() {
    return this.prisma.raffle.findMany({
      include: { Winner: true, tickets: true },
    });
  }

  findOne(id: number): Promise<Raffle | null> {
    return this.prisma.raffle.findUnique({
      where: { id },
      include: { Prize: true, Promotion: true },
    });
  }

  async update(id: number, data: UpdateRaffleDto) {
    const { prizes, promotions, ...raffleData } = data;

    const updatedRaffle = await this.prisma.raffle.update({
      where: { id },
      data: raffleData,
    });

    await this.prisma.promotion.deleteMany({
      where: { raffleId: id },
    });

    const promotionsMounted = promotions.map((promotion) => ({
      quantity: promotion.quantity,
      price: promotion.price,
      raffleId: id,
    }));

    await this.prisma.promotion.createMany({
      data: promotionsMounted,
    });

    await this.prisma.prize.deleteMany({
      where: { raffleId: id },
    });
    const prizesMounted = prizes.map((prize) => ({
      name: prize.name,
      place: prize.place,
      raffleId: id,
    }));

    // Cria as novas premiações
    await this.prisma.prize.createMany({
      data: prizesMounted,
    });

    return updatedRaffle;
  }
  remove(id: number): Promise<Raffle> {
    return this.prisma.raffle.delete({ where: { id } });
  }
}
