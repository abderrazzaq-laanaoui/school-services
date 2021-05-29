import { LigneDocumentAffectation } from 'src/ligne-document-affectation/ligne-document-affectation.entity';
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DocumentTypes } from './document-types.enum';

@Entity()
export class Document  extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ enum: [DocumentTypes.COURS, DocumentTypes.TD, DocumentTypes.TP] })
  type: DocumentTypes;

  @Column()
  path: string;

  @OneToMany(() => LigneDocumentAffectation, (lda) => lda.document)
  lignesDocumentAffectation: LigneDocumentAffectation[];
}
