// ticket.repository.ts
import { PrismaService } from 'src/prisma.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

export class TicketRepository {
  constructor(private prisma: PrismaService) {}

  async create(createTicketDto: CreateTicketDto) {
    return this.prisma.ticket.create({
      data: {
        name: createTicketDto.name,
        email: createTicketDto.email,
        phone: createTicketDto.phone,
        number: createTicketDto.number,
        status: createTicketDto.status,
        expirationDate: createTicketDto.expirationDate,
        raffleId: createTicketDto.raffleId,
      },
    });
  }

  async findAll() {
    return this.prisma.ticket.findMany();
  }

  async findOne(id: number) {
    return this.prisma.ticket.findUnique({ where: { id } });
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
