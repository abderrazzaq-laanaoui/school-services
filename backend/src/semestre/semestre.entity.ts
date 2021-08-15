import { Module } from "src/module/module.entity";
import { LigneClasseSemestre } from "../ligne-classe-semestre/ligne-classe-semestre.entity";
import {  BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Semestre  extends BaseEntity {
  @PrimaryGeneratedColumn()
  id:number;
  
  @Column({unique:true})
  nom: string;

  @OneToMany(type=>Module, module => module.semestre,{eager:true})
  modules:Module[]

  // one to many reation with LigneClasseSemestre
  @OneToMany(type=>LigneClasseSemestre, ligneClasseSemestre => ligneClasseSemestre.semestre,{eager:true})
  lignesClasseSemestre:LigneClasseSemestre[]

}