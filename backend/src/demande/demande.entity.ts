import { Admin, Etudiant, Professeur } from 'src/user/user.entity';
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DemandeType } from './demande-type.entity'

@Entity()
export class Demande  extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column()
  dateLaivraison: Date;

  @Column()
  isDelivred: boolean;

  @Column()
  path: string;

  @Column()
  motif: string;

  @Column()
  autre: string;

  @ManyToOne(()=>DemandeType, (demandeType)=>demandeType.demandes)
  type: DemandeType;

  @ManyToOne(() => Admin, (admin) => admin.livraisons)
  livreur: Admin;

  @ManyToOne(() => Etudiant, (etudiant) => etudiant.demandes)
  etudiant: Etudiant;
}
