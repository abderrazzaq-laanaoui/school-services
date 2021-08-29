import { Module } from "src/module/module.entity";
import { Etudiant } from "src/user/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class NoteModule extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nsn: number;

    @Column()
    dsn: string;

    @Column()
    nsr: number;

    @Column()
    dsr: string;

    @ManyToOne(type => Etudiant, etudiant => etudiant.notesModule)
    etudiant: Etudiant;

    @ManyToOne(type => Module, module => module.notesModule,{eager:true})
    module: Module;

}