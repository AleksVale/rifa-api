// ticket.repository.ts
import { PrismaService } from 'src/prisma.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

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
    return this.prisma.ticket.findMany({
      where: { raffle: { id } },
      include: { Buyer: true },
    });
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
