import { AnneeScolaire } from 'src/annee-scolaire/annee-scolaire.entity';
import { Calendrier } from 'src/calendrier/calendrier.entity';
import { Classe } from 'src/classe/classe.entity';
import { Epreuve } from 'src/epreuve/epreuve.entity';
import { Seance } from 'src/seance/seance.entity';
import { Etudiant } from 'src/user/user.entity';
import { BaseEntity, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LigneClasseSemstre extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Classe, (classe) => classe.lignesClesseSemestre)
  classe: Classe;

  @OneToMany(() => Etudiant, (etudiant) => etudiant.ligneClasseSemestre)
  etudiants: Etudiant[];

  @ManyToOne(() => AnneeScolaire, (anneeScolaire) => anneeScolaire.lcs)
  anneeScolaire: AnneeScolaire;

  @OneToMany(() => Seance, (seance) => seance.ligneClasseSemstre)
  seances: Seance[];

  @OneToMany(() => Epreuve, (epreuve) => epreuve.lcs)
  epreuves: Epreuve[];

  @OneToOne(() => Calendrier)
  @JoinColumn()
  calendier: Calendrier;
}
