import { Epreuve } from 'src/epreuve/epreuve.entity';
import { Matiere } from 'src/matiere/matiere.entity';
import { Etudiant } from 'src/user/user.entity';
import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Note  extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  valeur: number;

  @ManyToOne(() => Etudiant, (etudiant) => etudiant.notes)
  etudiant: Etudiant;

  @ManyToOne(() => Epreuve, (epreuve) => epreuve.notes)
  epreuve: Epreuve;


}
