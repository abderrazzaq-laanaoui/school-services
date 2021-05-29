import { Module } from '@nestjs/common';
import { AnneeScolaireService } from './annee-scolaire.service';
import { AnneeScolaireController } from './annee-scolaire.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnneeScolaire } from './annee-scolaire.entity';

@Module({
  imports:[TypeOrmModule.forFeature([AnneeScolaire])],
  providers: [AnneeScolaireService],
  controllers: [AnneeScolaireController]
})
export class AnneeScolaireModule {}
