import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DemandeType } from './demande-type.entity';
import { DemandeController } from './demande.controller';
import { DemandeRepository } from './demande.repository';
import { DemandeService } from './demande.service';

@Module({
  imports:[TypeOrmModule.forFeature([DemandeRepository,DemandeType])],
  controllers: [DemandeController],
  providers: [DemandeService]
})
export class DemandeModule {}
