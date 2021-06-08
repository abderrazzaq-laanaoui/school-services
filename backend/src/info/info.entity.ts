import { LigneClasseSemstre } from "src/ligne-classe-semestre/ligne-classe-semestre.entity";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Info extends BaseEntity{
  @PrimaryGeneratedColumn()
  id:number;

  @Column()
  title:string;

  @Column({type:'text'})
  content:string;

  @Column()
  type: string;

  @ManyToMany(() => LigneClasseSemstre)
  @JoinTable()
  lignesClasseSemstre: LigneClasseSemstre[];
  //TODO : add relation to lcs
}