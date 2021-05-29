import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatiereController } from './matiere.controller';
import { MatiereRepository } from './matiere.repository';
import { MatiereService } from './matiere.service';

@Module({
  imports:[TypeOrmModule.forFeature([MatiereRepository])],
  controllers: [MatiereController],
  providers: [MatiereService]
})
export class MatiereModule {}
