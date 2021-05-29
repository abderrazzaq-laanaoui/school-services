import {  BaseEntity, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class Semestre  extends BaseEntity {

  @PrimaryColumn()
  nom: string;

}