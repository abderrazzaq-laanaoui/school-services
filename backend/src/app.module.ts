import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UserModule } from './user/user.module';
import { DocumentModule } from './document/document.module';
import { SemestreModule } from './semestre/semestre.module';
import { SemesterController } from './semester/semester.controller';
import { ModuleModule } from './module/module.module';
import { RapportModule } from './rapport/rapport.module';
import { DemandeModule } from './demande/demande.module';
import { EvenementModule } from './evenement/evenement.module';
import { NoteModule } from './note/note.module';
import { MatiereModule } from './matiere/matiere.module';
import { CalendrierModule } from './calendrier/calendrier.module';
import { AbsenceModule } from './absence/absence.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), UserModule, DocumentModule, SemestreModule, ModuleModule, RapportModule, DemandeModule, EvenementModule, NoteModule, MatiereModule, CalendrierModule, AbsenceModule],
  controllers: [SemesterController],
})
export class AppModule {}
