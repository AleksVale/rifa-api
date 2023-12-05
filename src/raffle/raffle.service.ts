import { Injectable } from '@nestjs/common';
import { CreateRaffleDto } from './dto/create-raffle.dto';
import { UpdateRaffleDto } from './dto/update-raffle.dto';
import { PrismaService } from '../prisma.service';
import { Raffle } from '@prisma/client';

@Injectable()
export class RaffleService {
  constructor(private readonly prisma: PrismaService) {}

  create(createRaffleDto: CreateRaffleDto) {
    this.prisma.raffle.create({ data: createRaffleDto });
    return 'This action adds a new raffle';
  }

  findAll() {
    return `This action returns all raffle`;
  }

  findOne(id: number) {
    return `This action returns a #${id} raffle`;
  }

  update(id: number, updateRaffleDto: UpdateRaffleDto) {
    return `This action updates a #${id} raffle`;
  }

  remove(id: number) {
    return `This action removes a #${id} raffle`;
  }
}
