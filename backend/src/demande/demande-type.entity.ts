import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Demande } from './demande.entity';

@Entity()
export class DemandeType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Demande, (demande) => demande.type, { eager: false })
  demandes: Demande[];
}
