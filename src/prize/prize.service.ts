// prize.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrizeRepository } from './prize.repository';
import { CreatePrizeDto } from './dto/create-prize.dto';
import { UpdatePrizeDto } from './dto/update-prize.dto';

@Injectable()
export class PrizeService {
  constructor(private readonly prizeRepository: PrizeRepository) {}

  async create(createPrizeDto: CreatePrizeDto) {
    try {
      return await this.prizeRepository.create(createPrizeDto);
    } catch (error) {
      // Handle database-related errors here
      throw new Error('Failed to create prize.');
    }
  }

  async findAll() {
    try {
      return await this.prizeRepository.findAll();
    } catch (error) {
      // Handle database-related errors here
      throw new Error('Failed to fetch prizes.');
    }
  }

  async findOne(id: number) {
    try {
      const prize = await this.prizeRepository.findOne(id);
      if (!prize) {
        throw new NotFoundException(`Prize with ID ${id} not found.`);
      }
      return prize;
    } catch (error) {
      // Handle database-related errors here
      throw new Error('Failed to fetch prize.');
    }
  }

  async update(id: number, updatePrizeDto: UpdatePrizeDto) {
    try {
      const updatedPrize = await this.prizeRepository.update(
        id,
        updatePrizeDto,
      );
      if (!updatedPrize) {
        throw new NotFoundException(`Prize with ID ${id} not found.`);
      }
      return updatedPrize;
    } catch (error) {
      // Handle database-related errors here
      throw new Error(`Failed to update prize with ID ${id}.`);
    }
  }

  async remove(id: number) {
    try {
      const deletedPrize = await this.prizeRepository.remove(id);
      if (!deletedPrize) {
        throw new NotFoundException(`Prize with ID ${id} not found.`);
      }
      return deletedPrize;
    } catch (error) {
      // Handle database-related errors here
      throw new Error(`Failed to remove prize with ID ${id}.`);
    }
  }
}
