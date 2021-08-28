import { AnneeScolaire } from 'src/annee-scolaire/annee-scolaire.entity';
import { Calendrier } from 'src/calendrier/calendrier.entity';
import { Classe } from 'src/classe/classe.entity';
import { Seance } from 'src/seance/seance.entity';
import { Semestre } from 'src/semestre/semestre.entity';
import { Etudiant } from 'src/user/user.entity';
import { BaseEntity, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LigneClasseSemestre extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  //many to one realtion with semstre
  @ManyToOne(() => Semestre, (semestre) => semestre.lignesClasseSemestre)
  semestre: Semestre;
 
  @ManyToMany(() => Etudiant, (etudiant) => etudiant.lignesClesseSemestre)
  etudiants: Etudiant[];

  @ManyToOne(() => AnneeScolaire, (anneeScolaire) => anneeScolaire.lcs)
  anneeScolaire: AnneeScolaire;

  @OneToMany(() => Seance, (seance) => seance.ligneClasseSemstre)
  seances: Seance[];

  //one to many relation with classe entity
  @OneToMany(type=> Classe, classe => classe.lcs)
  classes: Classe[];

  

  // @OneToMany(() => Epreuve, (epreuve) => epreuve.lcs)
  // epreuves: Epreuve[];

  // @OneToMany(type=>NoteMatiere, noteMatiere => noteMatiere.lcs)
  // noteMatieres: NoteMatiere[];

  @OneToOne(() => Calendrier)
  @JoinColumn()
  calendier: Calendrier;
}
