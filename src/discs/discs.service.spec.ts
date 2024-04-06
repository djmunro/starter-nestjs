import { Test, TestingModule } from '@nestjs/testing';
import { DiscsService } from './discs.service';

describe('DiscsService', () => {
  let service: DiscsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiscsService],
    }).compile();

    service = module.get<DiscsService>(DiscsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
