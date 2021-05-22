import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { DocumentTypes } from './document-types.enum';

@Entity()
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    enum: [DocumentTypes.COURS, DocumentTypes.TD, DocumentTypes.COURS],
  })
  type: DocumentTypes;
}
