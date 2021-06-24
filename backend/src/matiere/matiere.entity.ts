import { Article } from 'src/article/article.entity';
import { Epreuve } from 'src/epreuve/epreuve.entity';
import { Module } from 'src/module/module.entity';
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


  @ManyToOne(()=>Professeur,(professeur)=>professeur.matieres)
  professeur:Professeur;

  @ManyToOne(type=>Module, module=>module.matieres,{eager:false})
  module:Module;

  // @OneToMany(() => Seance, (seance) => seance.matiere)
  // seances: Seance[];

  // @OneToMany(() => Epreuve, (epreuve) => epreuve.matiere)
  // epreuves: Epreuve[];
  // @OneToMany(type=> Article, a => a.content)
  // articles: Article[];
}
