import { EntityRepository, Repository } from 'typeorm';
import { AddStudentDto, AddUserDto } from './dto/addUser.dto';
import { Admin, Etudiant, Professeur, User } from './user.entity';
import { ConflictException, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as _ from 'lodash';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { JwtPayload } from './auth/jwt-payload.interface';
import { use } from 'passport';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async updateUser(id: number, userData: any) {
    let user = await this.findOne({id});    
    if(!user) throw new NotFoundException("L'utilisateur demandé n'existe pas!");
    user.nom = userData.nom;
    user.prenom = userData.prenom;
    user.email = userData.email;
    user.cin = userData.cin;
    if(user instanceof Etudiant && userData.cne)
      user.cne = userData.cne;
    
    return await user.save();
    }

  async getUser(id: number) {
    return await this.findOne({ id });
  }

  async addStudent(addStudentDto: AddStudentDto): Promise<Partial<Etudiant>> {
    const { cin, cne, nom, prenom, email, password } = addStudentDto;

    const etudiant = new Etudiant();
    etudiant.cin = cin;
    etudiant.cne = cne;
    etudiant.nom = nom;
    etudiant.prenom = prenom;
    etudiant.email = email;
    etudiant.salt = await bcrypt.genSalt();
    etudiant.password = await this.hashPassword(password, etudiant.salt);
    return _.omit(await this.saveUser(etudiant), 'password', 'salt');
  }

  async addProfesseur(addProfesseurDto: AddUserDto): Promise<Partial<Professeur>> {
    const { cin, nom, prenom, email, password } = addProfesseurDto;

    const professeur = new Professeur();
    professeur.cin = cin;
    professeur.nom = nom;
    professeur.prenom = prenom;
    professeur.email = email;
    professeur.salt = await bcrypt.genSalt();
    professeur.password = await this.hashPassword(password, professeur.salt);
    return _.omit(await this.saveUser(professeur), 'password', 'salt');
  }

  async addAdmin(addUserDto: AddUserDto): Promise<Partial<Admin>> {
    const { cin, nom, prenom, email, password } = addUserDto;

    const admin = new Admin();
    admin.cin = cin;
    admin.nom = nom;
    admin.prenom = prenom;
    admin.email = email;
    admin.salt = await bcrypt.genSalt();
    admin.password = await this.hashPassword(password, admin.salt);
    return _.omit(await this.saveUser(admin), 'password', 'salt');
  }

  private async saveUser<T extends User>(user: T): Promise<Partial<T>> {
    try {
      return await user.save();
    } catch (e) {
      if (e.code === '23505') throw new ConflictException(e.detail);// deplicate unique keys
    }
  }

  async validateUserPassword(authCredntialDto: AuthCredentialDto): Promise<JwtPayload> {
    const { email, password } = authCredntialDto;
    const user = await this.createQueryBuilder('user')
      .addSelect(['user.password', 'user.salt'])
      .where('user.email = :email', { email })
      .getOne();

    if (user && (await user.validatePassword(password))) {
     // let role = user instanceof Admin ? '/Admin' : user instanceof Etudiant ? '/Etudiant' : '/Professeur';
      return {id:user.id, email: user.email, nom: user.nom, prenom: user.prenom, role: user.type };
    }
    return null;
  }

  private async hashPassword(password: string, salt: string) {
    return bcrypt.hash(password, salt);
  }
}
