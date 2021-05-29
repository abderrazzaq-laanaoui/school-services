import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AbsenceController } from './absence.controller';
import { AbsenceRepository } from './absence.repository';
import { AbsenceService } from './absence.service';

@Module({
  imports:[TypeOrmModule.forFeature([AbsenceRepository])],
  controllers: [AbsenceController],
  providers: [AbsenceService]
})
export class AbsenceModule {}
