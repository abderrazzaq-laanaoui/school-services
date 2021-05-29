import { Module } from '@nestjs/common';
import { EpreuveService } from './epreuve.service';
import { EpreuveController } from './epreuve.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EpreuveRepository } from './epreuve.repository';

@Module({
  imports:[TypeOrmModule.forFeature([EpreuveRepository])],
  providers: [EpreuveService],
  controllers: [EpreuveController]
})
export class EpreuveModule {}
