import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalendrierController } from './calendrier.controller';
import { CalendrierRepository } from './calendrier.repository';
import { CalendrierService } from './calendrier.service';

@Module({
  imports:[TypeOrmModule.forFeature([CalendrierRepository])],
  controllers: [CalendrierController],
  providers: [CalendrierService]
})
export class CalendrierModule {}
