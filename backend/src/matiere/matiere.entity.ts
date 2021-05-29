import { Epreuve } from 'src/epreuve/epreuve.entity';
import { Seance } from 'src/seance/seance.entity';
import { Professeur } from 'src/user/user.entity';
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Matiere  extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column()
  coefficient: number;

  @Column()
  hasTP: boolean;

  @ManyToOne(()=>Professeur,(professeur)=>professeur.matieres)
  professeur:Professeur;

  @OneToMany(() => Seance, (seance) => seance.matiere)
  seances: Seance[];

  @OneToMany(() => Epreuve, (epreuve) => epreuve.matiere)
  epreuves: Epreuve[];
}
