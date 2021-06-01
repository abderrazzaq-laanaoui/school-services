import {  BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Semestre  extends BaseEntity {
  @PrimaryGeneratedColumn()
  id:number;
  
  @Column({unique:true})
  nom: string;

}