import { Article } from 'src/article/article.entity';
import { Module } from 'src/module/module.entity';
import { NoteMatiere } from 'src/notes/note-matiere/note-matiere.entity';
import { Seance } from 'src/seance/seance.entity';
import { Professeur } from 'src/user/user.entity';
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Matiere  extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column({type:'decimal', precision:5, scale:3})
  coefficient: number;


  @ManyToOne(()=>Professeur,(professeur)=>professeur.matieres,{eager:true} )
  professeur:Professeur;

  @ManyToOne(type=>Module, module=>module.matieres,{eager:false})
  module:Module;

  @OneToMany(type=>Article, article=>article.matiere)
  articles: Article[];

  @OneToMany( type => NoteMatiere, noteMatiere => noteMatiere.matiere, {eager:false})
  notesMatiere: NoteMatiere[];
}
