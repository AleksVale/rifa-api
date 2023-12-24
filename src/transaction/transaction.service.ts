import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { PrismaService } from 'src/prisma.service';
import { MercadoPagoService } from 'src/services/mercado-pago.service';

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
}
