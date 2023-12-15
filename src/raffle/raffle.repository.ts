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

  findAll(): Promise<Raffle[]> {
    return this.prisma.raffle.findMany();
  }

  findOne(id: number): Promise<Raffle | null> {
    return this.prisma.raffle.findUnique({ where: { id } });
  }

  async update(id: number, data: UpdateRaffleDto) {
    const { prizes, promotions, ...raffleData } = data;

    const updatedRaffle = await this.prisma.raffle.update({
      where: { id },
      data: {
        ...raffleData,
        Prize: prizes
          ? {
              upsert: prizes.map((prize) => ({
                where: { id: prize.id },
                update: prize,
                create: { name: prize.name, place: prize.place },
              })),
            }
          : undefined, // Set to undefined if not provided
        Promotion: promotions
          ? {
              upsert: promotions.map((promotion) => ({
                where: { id: promotion.id },
                update: promotion,
                create: {
                  quantity: promotion.quantity,
                  price: promotion.price,
                },
              })),
            }
          : undefined, // Set to undefined if not provided
      },
    });

    return updatedRaffle;
  }
  remove(id: number): Promise<Raffle> {
    return this.prisma.raffle.delete({ where: { id } });
  }
}
