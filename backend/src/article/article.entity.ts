import { Classe } from "../classe/classe.entity";
import { Matiere } from "src/matiere/matiere.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Article extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title:string;

  @Column({type:'longtext'})
  content:string;

  @ManyToOne(type => Matiere, matiere => matiere.articles)
  matiere: Matiere;

  @ManyToOne(type => Classe, classe => classe.articles)
  classe: Classe;

}