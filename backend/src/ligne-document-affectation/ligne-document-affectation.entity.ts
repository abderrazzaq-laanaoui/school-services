import { Document } from 'src/document/document.entity';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class LigneDocumentAffectation  extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @ManyToOne(()=>Document,(document)=>document.lignesDocumentAffectation)
  document: Document;

}
