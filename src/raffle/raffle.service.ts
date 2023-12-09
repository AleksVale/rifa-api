// raffle.service.ts
import { Injectable } from '@nestjs/common';
import { CreateRaffleDto } from './dto/create-raffle.dto';
import { UpdateRaffleDto } from './dto/update-raffle.dto';
import { RaffleRepository } from './raffle.repository';

@Injectable()
export class RaffleService {
  constructor(private readonly raffleRepository: RaffleRepository) {}

  async create(createRaffleDto: CreateRaffleDto) {
    const { name, ticketLimit } = createRaffleDto;

    const newRaffle = await this.raffleRepository.create({
      name,
      ticketLimit,
    });

    return newRaffle;
  }

  findAll() {
    return this.raffleRepository.findAll();
  }

  findOne(id: number) {
    return this.raffleRepository.findOne(id);
  }

  update(id: number, updateRaffleDto: UpdateRaffleDto) {
    return this.raffleRepository.update(id, updateRaffleDto);
  }

  remove(id: number) {
    return this.raffleRepository.remove(id);
  }
}
