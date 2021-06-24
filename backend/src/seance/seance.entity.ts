import { Absence } from 'src/absence/absence.entity';
import { LigneClasseSemstre } from 'src/ligne-classe-semestre/ligne-classe-semestre.entity';
import { Matiere } from 'src/matiere/matiere.entity';
import { Professeur } from 'src/user/user.entity';
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Seance  extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  dateDebut: Date;

  @Column()
  dateFin: Date;

  @Column()
  rapport: string;

  @ManyToOne(() => Professeur, (professeur) => professeur.seances)
  professeur: Professeur;

  @OneToMany(() => Absence, (absence) => absence.seance)
  absences: Absence[];

  @ManyToOne(() => LigneClasseSemstre, (lcs) => lcs.seances)
  ligneClasseSemstre: LigneClasseSemstre;


}
