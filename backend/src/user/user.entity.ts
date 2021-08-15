import { Absence } from 'src/absence/absence.entity';
import * as bcrypt from 'bcrypt';
import { Demande } from 'src/demande/demande.entity';
import { LigneClasseSemestre } from 'src/ligne-classe-semestre/ligne-classe-semestre.entity';
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

  // birthday column 
  @Column({ nullable: true, default: null })
  birthday: Date; 

  @Column({ unique: true })
  email: string;

  // adress column
  @Column({ type: 'varchar', length: 255 })
  adresse: string;

  //phone column
  @Column({ nullable: true, default: null })
  tel: string;

  @Column({ select: false })
  password: string;

  @Column({ select: false })
  salt: string;

  @Column()
  type: string;
  
  @Column({ type: 'longtext'})
  avatar: string;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
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

  @ManyToOne(() => LigneClasseSemestre, (lcs) => lcs.etudiants)
  ligneClasseSemestre: LigneClasseSemestre;

  @OneToMany(() => Note, (note) => note.etudiant, { eager: false })
  notes: Note[];

  @OneToMany(() => Absence, (absence) => absence.etudiant, { eager: false })
  absences: Absence[];

  @OneToMany(() => Demande, (demande) => demande.etudiant, { eager: false })
  demandes: Demande[];
}
