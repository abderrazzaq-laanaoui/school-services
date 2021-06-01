import { Epreuve } from 'src/epreuve/epreuve.entity';
import { Etudiant } from 'src/user/user.entity';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Note extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  valeur: number;

  @ManyToOne(() => Etudiant, (etudiant) => etudiant.notes, { eager: false })
  etudiant: Etudiant;

  @ManyToOne(() => Epreuve, (epreuve) => epreuve.notes, { eager: false })
  epreuve: Epreuve;
}
