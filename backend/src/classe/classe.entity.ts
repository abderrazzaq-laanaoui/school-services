import { LigneClasseSemestre } from "src/ligne-classe-semestre/ligne-classe-semestre.entity";
import { BaseEntity, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Classe extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(()=>LigneClasseSemestre, (lcs)=>lcs.classe)
  lignesClesseSemestre: LigneClasseSemestre[];
}