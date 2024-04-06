import { Module } from '@nestjs/common';
import { DiscsResolver } from './discs.resolver';
import { DiscsService } from './discs.service';

@Module({
  providers: [DiscsResolver, DiscsService]
})
export class DiscsModule {}
