import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Public } from 'src/util/Decorators/public';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Public()
  @Post()
  create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.webhook(createTransactionDto);
  }

  @Public()
  @Get(':phone')
  get(@Param('phone') phone: string) {
    return this.transactionService.getByPhone(phone);
  }

  @Get('raffle/:id')
  getByRaffle(@Param('id') id: string) {
    return this.transactionService.getByRaffleId(+id);
  }
}
