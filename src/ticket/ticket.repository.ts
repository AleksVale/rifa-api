// ticket.repository.ts
import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { MercadoPagoPayment } from 'src/services/mercado-pago.service';

@Injectable()
export class TicketRepository {
  constructor(private prisma: PrismaService) {}

  private async generateUniqueTicketNumber(raffleId: number): Promise<number> {
    const { ticketLimit } = await this.prisma.raffle.findUnique({
      where: { id: raffleId },
      select: { ticketLimit: true },
    });

    if (!ticketLimit) {
      throw new Error('Raffle does not have a valid ticketLimit.');
    }

    const existingNumbers = await this.prisma.ticket.findMany({
      where: { raffleId },
      select: { number: true },
    });

    const allNumbers = Array.from(
      { length: ticketLimit },
      (_, index) => index + 1,
    );
    const availableNumbers = allNumbers.filter(
      (num) => !existingNumbers.some((ticket) => ticket.number === num),
    );

    if (availableNumbers.length === 0) {
      throw new BadRequestException('All ticket numbers have been assigned.');
    }

    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    return availableNumbers[randomIndex];
  }

  async create(createTicketDto: CreateTicketDto, payment: MercadoPagoPayment) {
    const { quantity, raffleId, status, expirationDate } = createTicketDto;

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
    const createdTickets = [];
    for (let i = 0; i < quantity; i++) {
      const number = await this.generateUniqueTicketNumber(raffleId);
      const data = {
        number,
        status,
        expirationDate,
        raffleId,
        buyerId: buyer.id,
      };
      createdTickets.push(data);
    }
    const transaction = await this.prisma.transaction.create({
      data: {
        id: payment.id,
        amount: createTicketDto.quantity,
        value: payment.transaction_amount,
        buyerId: buyer.id,
        Ticket: {
          createMany: {
            data: createdTickets,
          },
        },
      },
    });
    return transaction;
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
