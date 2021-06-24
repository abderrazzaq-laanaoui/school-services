import { Module } from "src/module/module.entity";
import {  BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Semestre  extends BaseEntity {
  @PrimaryGeneratedColumn()
  id:number;
  
  @Column({unique:true})
  nom: string;

  @OneToMany(type=>Module, module => module.semestre,{eager:true})
  modules:Module[]

}