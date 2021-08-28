import { Matiere } from "src/matiere/matiere.entity";
import { NoteModule } from "src/notes/note-module/note-module.entity";
import { Semestre } from "src/semestre/semestre.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Module  extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @ManyToOne(type=> Semestre, semestre=> semestre.modules,{eager:false})
  semestre: Semestre;

  @OneToMany(type=> NoteModule, noteModule=> noteModule.module,{eager:true})
  notesModule: NoteModule[];
  
  @OneToMany(type=>Matiere, matiere=>matiere.module,{eager:true})
  matieres: Matiere[];
}