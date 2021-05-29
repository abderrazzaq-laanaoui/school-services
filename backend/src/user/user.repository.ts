import { EntityRepository, Repository } from 'typeorm';
import { AddStudentDto, AddUserDto } from './dto/addUser.dto';
import { Admin, Etudiant, Professeur, User } from './user.entity';
import * as _ from 'lodash';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  async addStudent(addStudentDto: AddStudentDto): Promise<Partial<Etudiant>> {
    const { cin, cne, nom, prenom, email, password } = addStudentDto;

    const etudiant = new Etudiant();
    etudiant.cin = cin;
    etudiant.cne = cne;
    etudiant.nom = nom;
    etudiant.prenom = prenom;
    etudiant.email = email;
    etudiant.password = password;
    return _.omit(await etudiant.save(), 'password');
  }

  async addProfesseur(addProfesseurDto: AddUserDto): Promise<Partial<Professeur>> {
    const { cin, nom, prenom, email, password } = addProfesseurDto;

    const professeur = new Professeur();
    professeur.cin = cin;
    professeur.nom = nom;
    professeur.prenom = prenom;
    professeur.email = email;
    professeur.password = password;
    return _.omit(await professeur.save(), 'password');
  }
  async addAdmin(addUserDto: AddUserDto): Promise<Partial<Admin>> {
    const { cin, nom, prenom, email, password } = addUserDto;

    const admin = new Admin();
    admin.cin = cin;
    admin.nom = nom;
    admin.prenom = prenom;
    admin.email = email;
    admin.password = password;
    return _.omit(await admin.save(), 'password');
  }
}
