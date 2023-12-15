import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { WinnerService } from './winner.service';
import { CreateWinnerDto } from './dto/create-winner.dto';
import { UpdateWinnerDto } from './dto/update-winner.dto';

@Controller('winner')
export class WinnerController {
  constructor(private readonly winnerService: WinnerService) {}

  @Post()
  create(@Body() createWinnerDto: CreateWinnerDto) {
    return this.winnerService.create(createWinnerDto);
  }

  @Get()
  findAll() {
    return this.winnerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.winnerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWinnerDto: UpdateWinnerDto) {
    return this.winnerService.update(+id, updateWinnerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.winnerService.remove(+id);
  }
}
