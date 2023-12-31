import { Module } from '@nestjs/common';
import { TicketService } from './ticket.service';
import { TicketController } from './ticket.controller';
import { TicketRepository } from './ticket.repository';
import { PrismaService } from '../prisma.service';
import { MercadoPagoService } from 'src/services/mercado-pago.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [TicketController],
  providers: [
    TicketService,
    TicketRepository,
    PrismaService,
    MercadoPagoService,
    ConfigService,
  ],
})
export class TicketModule {}
