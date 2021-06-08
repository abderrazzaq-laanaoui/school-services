import { Admin, Etudiant, Professeur } from 'src/user/user.entity';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DemandeType } from './demande-type.entity';

@Entity()
export class Demande extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;


  @Column({ default: false })
  isDelivred: boolean;

  @Column({ default: null })
  dateLaivraison: Date;

  @Column({ default: null, type: 'longtext' })
  file: string;

  @Column()
  motif: string;

  @Column({ default: null })
  autre: string;

  @ManyToOne(() => DemandeType, (demandeType) => demandeType.demandes, { eager: true })
  type: DemandeType;

  @ManyToOne(() => Admin, (admin) => admin.livraisons)
  livreur: Admin;

  @ManyToOne(() => Etudiant, (etudiant) => etudiant.demandes, { eager: true })
  etudiant: Etudiant;
}
