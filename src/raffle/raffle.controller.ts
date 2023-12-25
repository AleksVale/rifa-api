import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { RaffleService } from './raffle.service';
import { CreateRaffleDto } from './dto/create-raffle.dto';
import { UpdateRaffleDto } from './dto/update-raffle.dto';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { SuccessResponse } from 'src/common/dto/success.dto';
import { BadRequestResponse } from 'src/common/dto/bad-request.dto';
import { Raffle } from '@prisma/client';
import { Public } from 'src/util/Decorators/public';
import {
  AnyFilesInterceptor,
  FilesInterceptor,
} from '@nestjs/platform-express';
import multerConfig from 'src/util/multer.config';

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
  async create(@Body() createRaffleDto: CreateRaffleDto): Promise<Raffle> {
    return this.raffleService.create(createRaffleDto);
  }

  @Get()
  @ApiQuery({ name: 'status', enum: ['active', 'inactive'] })
  findAll(@Query('status') status: string) {
    return this.raffleService.findAll(status);
  }

  @Public()
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

  @Patch(':id/photos')
  @UseInterceptors(FilesInterceptor('files', 6, multerConfig))
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
  async updatePhotos(
    @Param('id') id: string,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<SuccessResponse> {
    this.raffleService.updatePhotos(+id, files);
    return { success: true };
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.raffleService.remove(+id);
  }
}
