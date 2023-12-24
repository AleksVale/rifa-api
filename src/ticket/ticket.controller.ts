import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateTicketResponseDTO } from './dto/create-ticket-response.dto';
import { CreateTicketDto } from './dto/create-ticket.dto';

@ApiTags('Ticket')
@Controller('ticket')
export class TicketController {
  constructor(private readonly ticketService: TicketService) {}

  @ApiResponse({ status: HttpStatus.CREATED, type: CreateTicketResponseDTO })
  @Post()
  create(@Body() createTicketDto: CreateTicketDto) {
    return this.ticketService.create(createTicketDto);
  }

  @Get()
  findAll() {
    return this.ticketService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ticketService.findOne(+id);
  }

  @Get('/buyer/:phone')
  findByPhone(@Param('phone') phone: string) {
    return this.ticketService.findByPhone(phone);
  }

  @Get('/raffle/:id')
  findByRaffle(@Param('id') id: string) {
    return this.ticketService.findByRaffle(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTicketDto: UpdateTicketDto) {
    return this.ticketService.update(+id, updateTicketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.ticketService.remove(+id);
  }
}
