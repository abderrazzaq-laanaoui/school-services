import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { UserModule } from './user/user.module';
import { DocumentModule } from './document/document.module';
import { SemestreModule } from './semestre/semestre.module';
import { ModuleModule } from './module/module.module';
import { DemandeModule } from './demande/demande.module';
import { EvenementModule } from './evenement/evenement.module';
import { NoteModule } from './note/note.module';
import { MatiereModule } from './matiere/matiere.module';
import { CalendrierModule } from './calendrier/calendrier.module';
import { AbsenceModule } from './absence/absence.module';
import { SeanceModule } from './seance/seance.module';
import { LigneClasseSemestreModule } from './ligne-classe-semestre/ligne-classe-semestre.module';
import { EpreuveModule } from './epreuve/epreuve.module';
import { AnneeScolaireModule } from './annee-scolaire/annee-scolaire.module';
import { ClasseModule } from './classe/classe.module';
import { LigneDocumentAffectationModule } from './ligne-document-affectation/ligne-document-affectation.module';
import { InfoModule } from './info/info.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UserModule,
    DocumentModule,
    SemestreModule,
    ModuleModule,
    DemandeModule,
    EvenementModule,
    NoteModule,
    MatiereModule,
    CalendrierModule,
    AbsenceModule,
    SeanceModule,
    LigneClasseSemestreModule,
    EpreuveModule,
    AnneeScolaireModule,
    ClasseModule,
    LigneDocumentAffectationModule,
    InfoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
