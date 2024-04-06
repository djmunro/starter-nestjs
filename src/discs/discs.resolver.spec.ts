import { Test, TestingModule } from '@nestjs/testing';
import { DiscsResolver } from './discs.resolver';

describe('DiscsResolver', () => {
  let resolver: DiscsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiscsResolver],
    }).compile();

    resolver = module.get<DiscsResolver>(DiscsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
