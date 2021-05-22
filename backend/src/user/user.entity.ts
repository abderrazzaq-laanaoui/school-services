/* eslint-disable prettier/prettier */
import { BaseEntity, ChildEntity, Column, Entity,  PrimaryGeneratedColumn, TableInheritance } from 'typeorm';

@Entity()
@TableInheritance({ column: { type: "varchar", name: "type" } })
export abstract class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    cin: string;
    
    @Column()
    nom: string;

    @Column()
    prenom: string;

    @Column()
    email: string;

    @Column() 
    password: string;


}

@ChildEntity()
export class Admin extends User{};

@ChildEntity()
export class Professeur extends User{};

@ChildEntity()
export class Etudiant extends User{
    @Column({unique: true})
    cne: string

}

