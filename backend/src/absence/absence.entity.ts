import { Seance } from 'src/seance/seance.entity';
import { Etudiant } from 'src/user/user.entity';
import { BaseEntity, Column, Entity, ManyToOne, OneToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Absence extends BaseEntity {
  @PrimaryColumn()
  id: number;

  @Column()
  motif: string;

  @Column()
  description: string;

  @ManyToOne(() => Etudiant, (etudiant) => etudiant.absences, { eager: false })
  etudiant: Etudiant;

  @ManyToOne(() => Seance, (seance) => seance.absences)
  seance: Seance;
}
