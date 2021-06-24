import { Matiere } from "src/matiere/matiere.entity";
import { Professeur } from "src/user/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Article extends BaseEntity{

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title:string;

  @Column({type:'longtext'})
  content:string;

}