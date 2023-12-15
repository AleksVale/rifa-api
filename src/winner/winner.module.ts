import { Module } from '@nestjs/common';
import { WinnerService } from './winner.service';
import { WinnerController } from './winner.controller';

@Module({
  controllers: [WinnerController],
  providers: [WinnerService],
})
export class WinnerModule {}
