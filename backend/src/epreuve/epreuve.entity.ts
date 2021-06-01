import { LigneClasseSemstre } from 'src/ligne-classe-semestre/ligne-classe-semestre.entity';
import { Matiere } from 'src/matiere/matiere.entity';
import { Note } from 'src/note/note.entity';
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Epreuve extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  Coefficient: number;

  @Column()
  path: string;

  @Column()
  date: Date;

  @Column()
  session: Sessions;

  @OneToMany(() => Note, (note) => note.epreuve, { eager: true })
  notes: Note[];

  @ManyToOne(() => LigneClasseSemstre, (lcs) => lcs.epreuves)
  lcs: LigneClasseSemstre;

  @ManyToOne(() => Matiere, (matiere) => matiere.epreuves)
  matiere: Matiere;
}

export enum Sessions {
  NORMAL = 'NORMAL',
  RATTRAPAGE = 'RATTRAPAGE',
}
