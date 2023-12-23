// ticket.repository.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Injectable()
export class TicketRepository {
  constructor(private prisma: PrismaService) {}

  async create(createTicketDto: CreateTicketDto) {
    const buyer = await this.prisma.buyer.findUnique({
      where: { phone: createTicketDto.phone },
    });
    if (!buyer) {
      await this.prisma.buyer.create({
        data: {
          name: createTicketDto.name,
          phone: createTicketDto.phone,
          email: createTicketDto.email,
        },
      });
    }
    return this.prisma.ticket.create({
      data: {
        number: createTicketDto.number,
        status: createTicketDto.status,
        expirationDate: createTicketDto.expirationDate,
        raffleId: createTicketDto.raffleId,
        buyerId: buyer.id,
      },
    });
  }

  async findAll() {
    return this.prisma.ticket.findMany();
  }

  async findOne(id: number) {
    return this.prisma.ticket.findUnique({ where: { id } });
  }

  async findByPhone(phone: string) {
    return this.prisma.ticket.findMany({
      where: { Buyer: { phone } },
    });
  }

  async findByRaffle(id: number) {
    const buyers = await this.prisma.buyer.findMany({
      where: { Ticket: { some: { raffleId: id } } },
      include: { Ticket: true },
      orderBy: {
        Ticket: {
          _count: 'desc', // Ordenar por quantidade de tickets em ordem descendente
        },
      },
    });

    return buyers.map((buyer, index) => ({
      ...buyer,
      place: index + 1, // Adicionar a coluna 'place' com base na posição no array ordenado
    }));
  }

  async remove(id: number) {
    return this.prisma.ticket.delete({ where: { id } });
  }

  async update(id: number, updateTicketDto: UpdateTicketDto) {
    return this.prisma.ticket.update({
      where: { id },
      data: updateTicketDto,
    });
  }
}
