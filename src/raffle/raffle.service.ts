// raffle.service.ts
import { Injectable } from '@nestjs/common';
import { CreateRaffleDto } from './dto/create-raffle.dto';
import { UpdateRaffleDto } from './dto/update-raffle.dto';
import { RaffleRepository } from './raffle.repository';

@Injectable()
export class RaffleService {
  constructor(private readonly raffleRepository: RaffleRepository) {}

  async create(createRaffleDto: CreateRaffleDto) {
    const { name, ticketLimit, price } = createRaffleDto;

    const newRaffle = await this.raffleRepository.create({
      name,
      ticketLimit,
      price,
    });

    return newRaffle;
  }

  async findAll(status?: string) {
    const raffles = await this.raffleRepository.findAll();

    return raffles.filter((raffle) => {
      if (status === 'active') {
        return !raffle.Winner;
      } else if (status === 'inactive') {
        return !!raffle.Winner;
      }
      return true;
    });
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
