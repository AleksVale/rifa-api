import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { RaffleService } from './raffle.service';
import { CreateRaffleDto } from './dto/create-raffle.dto';
import { UpdateRaffleDto } from './dto/update-raffle.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuccessResponse } from 'src/common/dto/success.dto';
import { BadRequestResponse } from 'src/common/dto/bad-request.dto';

@ApiTags('Rifa')
@Controller('raffles')
export class RaffleController {
  constructor(private readonly raffleService: RaffleService) {}

  @Post()
  @ApiResponse({
    status: 201,
    description: 'Success',
    type: SuccessResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: BadRequestResponse,
  })
  async create(
    @Body() createRaffleDto: CreateRaffleDto,
  ): Promise<SuccessResponse> {
    await this.raffleService.create(createRaffleDto);
    return { success: true };
  }

  @Get()
  findAll() {
    return this.raffleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.raffleService.findOne(+id);
  }

  @Patch(':id')
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: SuccessResponse,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request',
    type: BadRequestResponse,
  })
  async update(
    @Param('id') id: string,
    @Body() updateRaffleDto: UpdateRaffleDto,
  ): Promise<SuccessResponse> {
    await this.raffleService.update(+id, updateRaffleDto);
    return { success: true };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.raffleService.remove(+id);
  }
}
