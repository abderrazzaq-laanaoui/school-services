import { Module } from '@nestjs/common';
import { SeanceService } from './seance.service';
import { SeanceController } from './seance.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SeanceRepository } from './seance.repository';

@Module({
  imports:[TypeOrmModule.forFeature([SeanceRepository])],
  providers: [SeanceService],
  controllers: [SeanceController]
})
export class SeanceModule {}
