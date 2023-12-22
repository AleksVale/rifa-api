import { Test, TestingModule } from '@nestjs/testing';
import { WinnerController } from './winner.controller';
import { WinnerService } from './winner.service';

describe('WinnerController', () => {
  let controller: WinnerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WinnerController],
      providers: [WinnerService],
    }).compile();

    controller = module.get<WinnerController>(WinnerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
