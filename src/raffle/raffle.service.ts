// raffle.service.ts
import { Injectable } from '@nestjs/common';
import { CreateRaffleDto } from './dto/create-raffle.dto';
import { UpdateRaffleDto } from './dto/update-raffle.dto';
import { RaffleRepository } from './raffle.repository';
import * as fs from 'fs';
import * as path from 'path';

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
      } else if (status === 'finished') {
        return !!raffle.Winner;
      }
      return true;
    });
  }

  findOne(id: number) {
    return this.raffleRepository.findOne(id);
  }

  update(id: number, updateRaffleDto: UpdateRaffleDto) {
    const uploadRootPath = path.join(__dirname, '../..', 'upload/files');
    if (updateRaffleDto.deletedImages) {
      for (const imageName of updateRaffleDto.deletedImages) {
        const imagePath = path.join(uploadRootPath, imageName);

        try {
          // Check if the file exists before attempting to delete
          if (fs.existsSync(imagePath)) {
            // Delete the file
            fs.unlinkSync(imagePath);
            console.log(`Deleted ${imageName}`);
          } else {
            console.log(`${imageName} does not exist`);
          }
        } catch (error) {
          console.error(`Error deleting ${imageName}: ${error.message}`);
        }
      }
    }
    return this.raffleRepository.update(id, updateRaffleDto);
  }

  updatePhotos(id: number, files: Express.Multer.File[]) {
    const raffleImages = [];
    if (files && files.length > 0) {
      files.forEach((file) => {
        raffleImages.push({
          name: file.filename,
          url: `/uploads/files/${file.filename}`,
          raffleId: id,
        });
      });
    }

    return this.raffleRepository.updatePhotos(id, raffleImages);
  }

  remove(id: number) {
    return this.raffleRepository.remove(id);
  }
}
