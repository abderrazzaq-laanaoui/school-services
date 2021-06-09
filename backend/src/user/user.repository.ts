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

  async updateAvatar(id: number, avatar: string) {
    let user = await this.getUser(id);
    user.avatar = avatar;
    return _.pick(await this.saveUser(user), "avatar");
  }
  async updateUser(id: number, userData: any) {
    let user = await this.getUser(id);
    user.nom = userData.nom;
    user.prenom = userData.prenom;
    user.email = userData.email;
    user.cin = userData.cin;
    if(user instanceof Etudiant && userData.cne)
      user.cne = userData.cne;
    
    return await this.saveUser(user);
    }

  async getUser(id: number) : Promise<User>{
    let user = await this.findOne({id});    
    if(!user) throw new NotFoundException("L'utilisateur demandé n'existe pas!");
    return user;
  }

  async addStudent(addStudentDto: AddStudentDto): Promise<Partial<Etudiant>> {
    const { cin, cne, nom, prenom, email, password, avatar } = addStudentDto;

    const etudiant = new Etudiant();
    etudiant.cin = cin;
    etudiant.cne = cne;
    etudiant.nom = nom;
    etudiant.prenom = prenom;
    etudiant.avatar = avatar;
    etudiant.email = email;
    etudiant.salt = await bcrypt.genSalt();
    etudiant.password = await this.hashPassword(password, etudiant.salt);
    return await this.saveUser(etudiant);
  }

  async addProfesseur(addProfesseurDto: AddUserDto): Promise<Partial<Professeur>> {
    const { cin, nom, prenom, email, password, avatar } = addProfesseurDto;

    const professeur = new Professeur();
    professeur.cin = cin;
    professeur.nom = nom;
    professeur.prenom = prenom;
    professeur.avatar = avatar;
    professeur.email = email;
    professeur.salt = await bcrypt.genSalt();
    professeur.password = await this.hashPassword(password, professeur.salt);
    return await this.saveUser(professeur)
  }

  async addAdmin(addUserDto: AddUserDto): Promise<Partial<Admin>> {
    const { cin, nom, prenom, email, password, avatar } = addUserDto;

    const admin = new Admin();
    admin.cin = cin;
    admin.nom = nom;
    admin.prenom = prenom;
    admin.email = email;
    admin.avatar = avatar;
    admin.salt = await bcrypt.genSalt();
    admin.password = await this.hashPassword(password, admin.salt);
    return await this.saveUser(admin);
  }

  private async saveUser<T extends User>(user: T): Promise<Partial<T>> {
    try {
      return await user.save();
    } catch (e) {
      console.log(e);
      
      if (e.errno === 1062) throw new ConflictException("Il exsite deja un utilisateur soit avec même email, cne ou cin       ");// deplicate unique keys
      throw new Error(e.sqlMessage);
      
    }
  }

  async validateUserPassword(authCredntialDto: AuthCredentialDto): Promise<JwtPayload> {
    const { email, password } = authCredntialDto;
    const user = await this.createQueryBuilder('user')
      .addSelect(['user.password', 'user.salt'])
      .where('user.email = :email', { email })
      .getOne();

    if (user && (await user.validatePassword(password))) {
      return {id:user.id, email: user.email, nom: user.nom, prenom: user.prenom, role: user.type };
    }
    return null;
  }

  private async hashPassword(password: string, salt: string) {
    return bcrypt.hash(password, salt);
  }
}
