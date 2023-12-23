import { Injectable, NotFoundException } from '@nestjs/common';
import { TicketRepository } from './ticket.repository';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@Injectable()
export class TicketService {
  constructor(private readonly ticketRepository: TicketRepository) {}

  async create(createTicketDto: CreateTicketDto) {
    try {
      return await this.ticketRepository.create(createTicketDto);
    } catch (error) {
      throw new Error('Failed to create ticket.');
    }
  }

  async findAll() {
    try {
      return await this.ticketRepository.findAll();
    } catch (error) {
      throw new Error('Failed to fetch tickets.');
    }
  }

  async findOne(id: number) {
    try {
      const ticket = await this.ticketRepository.findOne(id);
      if (!ticket) {
        throw new NotFoundException(`Ticket with ID ${id} not found.`);
      }
      return ticket;
    } catch (error) {
      throw new Error('Failed to fetch ticket.');
    }
  }

  async findByPhone(phone: string) {
    try {
      const ticket = await this.ticketRepository.findByPhone(phone);
      return ticket;
    } catch (error) {
      throw new Error('Failed to fetch ticket.');
    }
  }

  async findByRaffle(id: number) {
    try {
      const ticket = await this.ticketRepository.findByRaffle(id);
      return ticket;
    } catch (error) {
      console.log(error);
      throw new Error('Failed to fetch ticket.');
    }
  }

  async update(id: number, updateTicketDto: UpdateTicketDto) {
    try {
      const updatedTicket = await this.ticketRepository.update(
        id,
        updateTicketDto,
      );
      if (!updatedTicket) {
        throw new NotFoundException(`Ticket with ID ${id} not found.`);
      }
      return updatedTicket;
    } catch (error) {
      throw new Error(`Failed to update ticket with ID ${id}.`);
    }
  }

  async remove(id: number) {
    try {
      const deletedTicket = await this.ticketRepository.remove(id);
      if (!deletedTicket) {
        throw new NotFoundException(`Ticket with ID ${id} not found.`);
      }
      return deletedTicket;
    } catch (error) {
      throw new Error(`Failed to remove ticket with ID ${id}.`);
    }
  }
}
