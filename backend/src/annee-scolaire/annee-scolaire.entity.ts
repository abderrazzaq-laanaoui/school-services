import { LigneClasseSemestre } from 'src/ligne-classe-semestre/ligne-classe-semestre.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AnneeScolaire extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // column for year of start 
  @Column()
  startYear: number;

  //  column for year of end
  @Column()
  endYear: number;

  @OneToMany(() => LigneClasseSemestre, (lcs) => lcs.anneeScolaire)
  lcs: LigneClasseSemestre[];
}
