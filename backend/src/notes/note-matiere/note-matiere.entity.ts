import { LigneClasseSemestre } from "src/ligne-classe-semestre/ligne-classe-semestre.entity";
import { Matiere } from "src/matiere/matiere.entity";
import { Etudiant } from "src/user/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class NoteMatiere extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({type:'decimal', precision:5, scale:3,nullable: true, default: null})
  cc: number;

  @Column({type:'decimal', precision:5, scale:3,nullable: true, default: null})
  tp: number;

  @Column({type:'decimal', precision:5, scale:3,nullable: true, default: null})
  ef: number;

  @Column({type:'decimal', precision:5, scale:3,nullable: true, default: null})
  nfn: number;

  @Column({type:'decimal', precision:5, scale:3,nullable: true, default: null})
  nfr: number;
  
  @ManyToOne(type => Matiere, matiere => matiere.notesMatiere)
  matiere: Matiere;

  @ManyToOne(type => Etudiant, etudiant => etudiant.notesMatiere)
  etudiant: Etudiant;
  
}