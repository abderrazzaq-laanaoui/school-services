import { LigneClasseSemestre } from "../ligne-classe-semestre/ligne-classe-semestre.entity";
import { BaseEntity,  Column,  Entity,  ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Etudiant } from "src/user/user.entity";
import { Article } from "src/article/article.entity";

@Entity()
export class Classe extends BaseEntity{
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  nom:string;

  @OneToMany(type => Etudiant, etudiant => etudiant.classe)
  etudiants:Etudiant[];

  @ManyToOne(type => LigneClasseSemestre, ligneClasseSemestre => ligneClasseSemestre.classes)
  lcs:LigneClasseSemestre;

   @OneToMany(type => Article, article => article.classe)
  articles: Article[];

}