import { Module } from '@nestjs/common';
import { WinnerService } from './winner.service';
import { WinnerController } from './winner.controller';
import { WinnerRepository } from './winner.repository';

@Module({
  controllers: [WinnerController],
  providers: [WinnerService, WinnerRepository],
})
export class WinnerModule {}
