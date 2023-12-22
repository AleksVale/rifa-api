import { Injectable, NotFoundException } from '@nestjs/common';
import { WinnerRepository } from './winner.repository';
import { CreateWinnerDto } from './dto/create-winner.dto';
import { UpdateWinnerDto } from './dto/update-winner.dto';

@Injectable()
export class WinnerService {
  constructor(private readonly winnerRepository: WinnerRepository) {}

  async create(createWinnerDto: CreateWinnerDto) {
    try {
      return await this.winnerRepository.create(createWinnerDto);
    } catch (error) {
      // Handle database-related errors here
      throw new Error('Failed to create winner.');
    }
  }

  async findAll() {
    try {
      return await this.winnerRepository.findAll();
    } catch (error) {
      // Handle database-related errors here
      throw new Error('Failed to fetch winners.');
    }
  }

  async findOne(id: number) {
    try {
      const winner = await this.winnerRepository.findOne(id);
      if (!winner) {
        throw new NotFoundException(`Winner with ID ${id} not found.`);
      }
      return winner;
    } catch (error) {
      // Handle database-related errors here
      throw new Error('Failed to fetch winner.');
    }
  }

  async update(id: number, updateWinnerDto: UpdateWinnerDto) {
    try {
      const updatedWinner = await this.winnerRepository.update(
        id,
        updateWinnerDto,
      );
      if (!updatedWinner) {
        throw new NotFoundException(`Winner with ID ${id} not found.`);
      }
      return updatedWinner;
    } catch (error) {
      // Handle database-related errors here
      throw new Error(`Failed to update winner with ID ${id}.`);
    }
  }

  async remove(id: number) {
    try {
      const deletedWinner = await this.winnerRepository.remove(id);
      if (!deletedWinner) {
        throw new NotFoundException(`Winner with ID ${id} not found.`);
      }
      return deletedWinner;
    } catch (error) {
      // Handle database-related errors here
      throw new Error(`Failed to remove winner with ID ${id}.`);
    }
  }
}
