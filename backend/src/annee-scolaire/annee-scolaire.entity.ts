import { LigneClasseSemstre } from 'src/ligne-classe-semestre/ligne-classe-semestre.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity()
export class AnneeScolaire extends BaseEntity {
  @PrimaryColumn()
  name: string;

  @OneToMany(() => LigneClasseSemstre, (lcs) => lcs.anneeScolaire)
  lcs: LigneClasseSemstre[];
}
