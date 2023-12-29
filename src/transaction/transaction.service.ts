import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { PrismaService } from 'src/prisma.service';
import { MercadoPagoService } from 'src/services/mercado-pago.service';
import * as dayjs from 'dayjs';

interface IFilter {
  status: string;
  ticket: string;
  name: string;
  email: string;
  phone: string;
  startDate: string;
  endDate: string;
}

@Injectable()
export class TransactionService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly mercadoPagoService: MercadoPagoService,
  ) {}
  async webhook(createTransactionDto: CreateTransactionDto) {
    if (createTransactionDto.action === 'payment.updated') {
      const transaction = await this.prismaService.transaction.findFirst({
        where: { id: Number(createTransactionDto.data.id) },
      });
      const payment = await this.mercadoPagoService.getPayment(
        createTransactionDto.data.id,
      );
      if (payment.status === 'approved') {
        await this.prismaService.ticket.updateMany({
          where: { transactionId: transaction.id },
          data: { status: 'PAID' },
        });
      }
    }
    return { success: true };
  }

  async getByPhone(phone: string) {
    const buyer = await this.prismaService.buyer.findUnique({
      where: { phone },
    });
    if (!buyer) {
      return { success: false, message: 'Buyer not found' };
    }
    const transactions = await this.prismaService.transaction.findMany({
      where: { buyerId: buyer.id },
      include: { Ticket: true },
    });
    return transactions;
  }

  private createFilter(filter: IFilter): Record<string, unknown> {
    const queryFilter = {};
    if (filter.status) {
      queryFilter['status'] = filter.status.toUpperCase();
    }

    if (filter.startDate && filter.endDate) {
      const startDate = dayjs(filter.startDate).startOf('day').toDate();
      const endDate = dayjs(filter.endDate).endOf('day').toDate();
      queryFilter['updatedAt'] = {
        gte: startDate,
        lte: endDate,
      };
    }

    if (filter.name) {
      queryFilter['buyer'] = { name: filter.name };
    } else if (filter.email) {
      queryFilter['buyer'] = { email: filter.email };
    } else if (filter.phone) {
      queryFilter['buyer'] = { phone: filter.phone };
    } else if (filter.ticket) {
      queryFilter['Ticket'] = { number: Number(filter.ticket) };
    }

    return queryFilter;
  }

  async getByRaffleId(id: number, filter: IFilter) {
    const mountedFilter = this.createFilter(filter);
    const transactions = await this.prismaService.transaction.findMany({
      where: {
        ...mountedFilter,
        Ticket: {
          every: {
            ...(mountedFilter.Ticket as object),
            raffleId: id,
          },
        },
      },
      include: { Ticket: true, buyer: true },
    });
    return transactions;
  }
}
