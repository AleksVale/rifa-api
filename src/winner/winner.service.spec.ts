import { Test, TestingModule } from '@nestjs/testing';
import { WinnerService } from './winner.service';

describe('WinnerService', () => {
  let service: WinnerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WinnerService],
    }).compile();

    service = module.get<WinnerService>(WinnerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
