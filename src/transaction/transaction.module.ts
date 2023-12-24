import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { PrismaService } from '../prisma.service';
import { MercadoPagoService } from 'src/services/mercado-pago.service';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [TransactionController],
  providers: [
    TransactionService,
    PrismaService,
    MercadoPagoService,
    ConfigService,
  ],
})
export class TransactionModule {}
