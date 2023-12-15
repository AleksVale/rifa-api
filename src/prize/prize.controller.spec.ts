import { Test, TestingModule } from '@nestjs/testing';
import { PrizeController } from './prize.controller';
import { PrizeService } from './prize.service';

describe('PrizeController', () => {
  let controller: PrizeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PrizeController],
      providers: [PrizeService],
    }).compile();

    controller = module.get<PrizeController>(PrizeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
