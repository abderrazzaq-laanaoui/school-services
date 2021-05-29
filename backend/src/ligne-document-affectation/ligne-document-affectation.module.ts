import { Module } from '@nestjs/common';
import { LigneDocumentAffectationService } from './ligne-document-affectation.service';
import { LigneDocumentAffectationController } from './ligne-document-affectation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LigneDocumentAffectationRepository } from './ligne-document-affectation.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LigneDocumentAffectationRepository])],
  providers: [LigneDocumentAffectationService],
  controllers: [LigneDocumentAffectationController],
})
export class LigneDocumentAffectationModule {}
