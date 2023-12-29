import { Controller, Post, Body, Get, Param, Query } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Public } from 'src/util/Decorators/public';
import { ApiQuery } from '@nestjs/swagger';

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

  @ApiQuery({ name: 'status' })
  @ApiQuery({ name: 'ticket' })
  @ApiQuery({ name: 'name' })
  @ApiQuery({ name: 'email' })
  @ApiQuery({ name: 'phone' })
  @ApiQuery({ name: 'startDate' })
  @ApiQuery({ name: 'endDate' })
  @Get('raffle/:id')
  getByRaffle(
    @Param('id') id: string,
    @Query('status') status: string,
    @Query('ticket') ticket?: string,
    @Query('name') name?: string,
    @Query('email') email?: string,
    @Query('phone') phone?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
  ) {
    const filter = {
      status,
      ticket,
      name,
      email,
      phone,
      startDate,
      endDate,
    };
    return this.transactionService.getByRaffleId(+id, filter);
  }
}
