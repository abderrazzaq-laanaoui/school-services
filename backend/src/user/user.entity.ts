import { Absence } from 'src/absence/absence.entity';
import { Demande } from 'src/demande/demande.entity';
import { LigneClasseSemstre } from 'src/ligne-classe-semestre/ligne-classe-semestre.entity';
import { Matiere } from 'src/matiere/matiere.entity';
import { Note } from 'src/note/note.entity';
import { Seance } from 'src/seance/seance.entity';
import {
  BaseEntity,
  ChildEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';

@Entity()
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export abstract class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  cin: string;

  @Column()
  nom: string;

  @Column()
  prenom: string;

  @Column()
  email: string;

  @Column()
  password: string;
}

@ChildEntity()
export class Admin extends User {
  @OneToMany(() => Demande, (demande) => demande.livreur)
  livraisons: Demande[];
}

@ChildEntity()
export class Professeur extends User {
  @OneToMany(() => Matiere, (matiere) => matiere.professeur)
  matieres: Matiere[];

  @OneToMany(() => Seance, (seance) => seance.professeur)
  seances: Seance[];
}

@ChildEntity()
export class Etudiant extends User {
  @Column({ unique: true })
  cne: string;

  @ManyToOne(() => LigneClasseSemstre, (lcs) => lcs.etudiants)
  ligneClasseSemestre: LigneClasseSemstre;

  @OneToMany(() => Note, (note) => note.etudiant)
  notes: Note[];

  @OneToMany(() => Absence, (absence) => absence.etudiant)
  absences: Absence[];

  @OneToMany(() => Demande, (demande) => demande.etudiant)
  demandes: Demande[];
}
